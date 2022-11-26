import page from "./page.js";
import pson from "./pson.js";
import component from "./component.js";
import access from "./access.js";
import socket from "./socket.js";
import method from "./method.js";
import gson from "./gson.js";
import handler from "./handler.js";

export default class Add {
    static get page(){
        return page;
    }

    static get pson(){
        return pson;
    }

    static get component(){
        return component;
    }

    static get access(){
        return access;
    }
    
    static get socket(){
        return socket;
    }

    static get gson(){
        return gson;
    }

    static get method(){
        return method;
    }

    static get handler(){
        return handler;
    }
}