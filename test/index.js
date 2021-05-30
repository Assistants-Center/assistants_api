const Assistants = require('../index');

const client = new Assistants.Client("assistants_api", "public123");

client.login().then(async (res)=>{
    if(res.error)return console.log(res);
    console.log(res);

    const userSession = await client.session();
    console.log(userSession);

    /*const newAccount = await client.register({username: "", email: "", password: "", tos: true});
    console.log(newAccount);*/


    const events = await client.events();

    const shopEmitter = events.shop;
    shopEmitter.on('shop::new', ({buff,lang}) => {
        console.log(`NEW SHOP! IMAGE buff: ${buff}, lang: ${lang}`);
    });

    const sectionsEmitter = events.sections;
    sectionsEmitter.on('sections::new', ({buff,lang}) => {
        console.log(`NEW SECTIONS! IMAGE buff: ${buff}, lang: ${lang}`);
    });
});