/**
 * @typedef {Object} configObj
 * @property {Number} port
 * @property {()void} callback
 * @property {Boolean} webSocket
 * @property {Boolean} webStore
 * @property {[path]} import
 * @property {Boolean} watcher
 * @property {Boolean} nodemon
 * @property {Boolean} detached
 * @property {[command]} command
 * @property {Boolean} pson
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