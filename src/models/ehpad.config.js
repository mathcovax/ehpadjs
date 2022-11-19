import { Config } from "ehpadjs";

export default new Config({
    port: 80,
    callback: () => {
        console.log("ready");
    },
    webSocket: false,
    webStore: false,
    import: [],
    watcher: false,
    nodemon: false,
    detached: false,
    commands: [],
    pson: true,
});
