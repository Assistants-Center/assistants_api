const nodeFetch = require('node-fetch');
const fetchNewCookies = require('fetch-cookie')(nodeFetch);

module.exports = async (username, email, password, tos, fetch) => {
    if(!username || !email || !password)return {error:true,message:"You must supply the following JSON arguments: email, username, password, and tos to create Assistants account."};
    if(tos!=true)return {error:true,message:"You must accept ToS to create a new account."};
    let result;
    let error;
    await fetchNewCookies("https://node.assistants.ga/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            tos: tos
        }),
    }).then(res=>res.json()).then((json)=>{
        if(json.error)error = json;
        else result = json;
    }).catch(e=>{
        error = {error:true,message:e.message};
    });
    return error || result;
};
