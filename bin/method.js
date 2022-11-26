import express from "express";

/**
 * @typedef {Object} postshort
 * @property {(data: JSON) void} s
 * @property {(data: JSON) void} e
 * @property {(data: url) void} r
 * @property {(info: String) {s:(data: JSON)void, e:(data: JSON)void}} msg
 */

/**
 * @param {(req:express.Request, res:express.Response, short:postshort)void} fnc
 * @return {} 
 */
export default function method(fnc){
    return fnc;
}