import express from "express";

/**
 * @typedef {Object} shrotAccess
 * @property {(path: Urlpath, type:("page" | "method"))Promise.<(true | false | undefined)>} otherAccess
 * @property {(data: JSON) void} s
 * @property {(data: JSON) void} e
 * @property {(data: url) void} r
 * @property {(info: String) {s:(data: JSON)void, e:(data: JSON)void}} msg
 */

/**
 * @param {(req:express.Request, res:express.Response, short:shrotAccess)(true | false | undefined)} fnc
 * @return {}
 */
export default function access(fnc){
    return fnc;
}