module.exports = async (parametr, password, fetch) => {
    let result;
    let error;
    await fetch("https://assistants.ga/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parametr: parametr,
            password: password
        }),
    }).then(res=>res.json()).then((json)=>{
        if(json.error)error = json;
        else result = json;
    }).catch(e=>{
        error = {error:true,message:e.message};
    });
    return error || result;
};