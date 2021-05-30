module.exports = async (fetch) => {
    let result;
    let error;
    await fetch("https://assistants.ga/session", {
        method: "GET",
    }).then(res=>res.json()).then((json)=>{
        if(json.error)error = json
        else result = json;

        if(!json.user)error = {error:true,message:"No user! Please try logging in again.", code:'NOUSER-RELOG'};
    }).catch(e=>{
        error = {error:true,message:e.message};
    });
    return error || result;
};