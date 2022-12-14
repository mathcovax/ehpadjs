const s = io({
    rejectUnauthorized: false,
    auth: {
        name: "ehpadjs-watch"
    }
});

s.on("restart", async () => {
    new LoadingOverlay();
    s.close();
    await ping();
    window.location.reload();
});

async function ping(){
    do{
        await sleep(500);
        try{var response = await fetch(window.location.origin + "/ehpadjs/ping", { method: "GET" });}catch{var response = {}}
    }
    while (response.ok !== true && response.status !== 200);
    return;
}