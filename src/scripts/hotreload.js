const s = io({
    rejectUnauthorized: false,
    auth: {
        name: "ehpadjs-hotreload"
    }
})

s.on("restart", async () => {
    new LoadingOverlay();
    s.close();
    await ping();
    window.location.reload();
});

s.on("hotreload", (arr) => {
    if(arr === "*")window.location.reload();
    else{
        for(const id of arr){
            if(id === document.body.dataset.vieuxjsPage || id === "*"){
                ToPage.reload();
            }
        }
    }
})

async function ping(){
    do{
        await sleep(500);
        try{var response = await fetch(window.location.origin + "/ehpadjs/ping", { method: "GET" });}catch{var response = {}}
    }
    while (response.ok !== true && response.status !== 200);
    return;
}