import express from "express";

/**
 * @typedef {Object} handlerShort
 * @property {(data: any)void} s
 * @property {(data: any)void} e
 * @property {(data: urlPath)} r
 * @property {(info: String) {s:(data: any)void, e:(data: any)void}} msg
 */

/**
 * @param {(req:express.Request, res:express.Response, short:handlerShort)Promise.<(true | false | undefined)>} fnc
 * @return {}
 */
export default function handler(fnc){
    return fnc;
}