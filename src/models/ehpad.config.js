/**
 * @typedef {Object} default
 * @property {Number} port
 * @property {()void} callback
 * @property {Boolean} webSocket
 * @property {Boolean} webStore
 * @property {[path]} import
 * @property {Boolean} watcher
 * @property {Boolean} nodemon
 * @property {Boolean} detached
 * @property {[command]} command
 */

export default {
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
    commands: []
}
