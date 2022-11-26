import { Config } from "ehpadjs";

export default new Config({
    port: 80,
    callback: () => {
        console.log("ready");
    },
    webStore: false,
    import: [],
    watcher: false,
    watch: false,
    ignoreFiles: [],
    detached: false,
    commands: [],
    handlers: false,
    sockets: false,
    psons: false,
    gsons: false,
    scss: false,
});
