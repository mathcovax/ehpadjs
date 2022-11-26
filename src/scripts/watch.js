const s = io({
    rejectUnauthorized: false,
    auth: {
        name: "ehpadjs-watch"
    }
});

s.on("disconnect", () => {
    new LoadingOverlay();
});

s.on("restart", () => {
    new LoadingOverlay();
});

s.io.on("reconnect", () => {
    window.location.reload();
});