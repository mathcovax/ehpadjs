/**
 * @typedef {Object} configObj
 * @property {Number} port
 * @property {()void} callback
 * @property {Boolean} webStore
 * @property {[path]} import
 * @property {Boolean} watcher
 * @property {Boolean} watch
 * @property {[path]} ignoreFiles
 * @property {Boolean} detached
 * @property {[command]} command
 * @property {Boolean} handlers
 * @property {Boolean} sockets
 * @property {Boolean} psons
 * @property {Boolean} gsons
 * @property {Boolean} scss
 */


export default class Config{
    /**
     * @param {configObj} config 
     */
    constructor(config={}){
        for(const key in config){
            this[key] = config[key];
        }
    }
}