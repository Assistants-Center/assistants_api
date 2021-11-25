const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch);
const EventEmitter = require('events');

const io = require("socket.io-client");

const socket = io("wss://node.assistants.ga", {});

const shop = new EventEmitter();
const sections = new EventEmitter();

/*socket.on("ping", ()=>console.log("Ping from socket.io // Assistants API"));*/

socket.on("shop::new", (data) => shop.emit("shop::new", data));
socket.on("sections::new", (data) => sections.emit("sections::new", data));

const methods = {
    login: require('./src/functions/login'),
    session: require('./src/functions/session'),
    register: require('./src/functions/register'),
}

class AssistantsClient {
    constructor(parametr, password) {
        this.user = null;
        if(!parametr || !password)throw new Error("Assistants: No credentials were given or one of them is missing.");
        this.parametr = parametr;
        this.password = password;
        
        setInterval(async ()=>{
            let session = await this.session();
            if(session.code == 'NOUSER-RELOG'){
                console.log("Assistants user session has ended, we are trying to relog you.");
                let relog = await this.login(parametr, password);
                if(relog.error)throw new Error("An attempt to renew the session has failed. Try to check your credentials.");
                this.user = relog.data;
                console.log(`Logged back in as ${relog.data.username}`);
            }
        }, 300000);
    }

    async login() {
        let data = (await methods.login(this.parametr, this.password, fetch));
        if(!data.error)this.user = data.data;
        return data;
    }

    async session() {
        if(!this.user)return {error:true,message:"No user! Please try logging in again.", code:'NOUSER-RELOG'};
        let data = (await methods.session(fetch));
        if(data.code == 'NOUSER-RELOG')this.user = null;
        return data;
    }

    async register({username,email,password, tos=true}) {
        let data = (await methods.register(username, email, password, tos, fetch));
        return data;
    }

    async events() {
        if(!this.user)return {error:true,message:"No user! Please try logging in again.", code:'NOUSER-RELOG'};
        let user = await this.session();
        if(user.error)return user;

        return {
            shop: shop,
            sections: sections
        };
    }

    async sthElse() {
        if(!this.user)return {error:true,message:"No user! Please try logging in again.", code:'NOUSER-RELOG'};
        let user = await this.session();
        if(user.error)return user;

        //do stuff
    }
}

module.exports = {
    Client: AssistantsClient,
    version: require("./package.json").version,
};
