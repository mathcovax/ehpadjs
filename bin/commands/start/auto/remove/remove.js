import page from "./page.js";
import component from "./component.js";
import access from "./access.js";
import socket from "./socket.js";
import method from "./method.js";

export default class Remove {
    static get page(){
        return page;
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

    static get method(){
        return method;
    }
}