const s = io({
    rejectUnauthorized: false,
    auth: {
        name: "nodemon"
    }
});

s.on("disconnect", () => {
    new LoadingOverlay();
});

s.io.on("reconnect", () => {
    window.location.reload();
});