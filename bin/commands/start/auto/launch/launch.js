import pages from "./pages.js";
import components from "./components.js";
import accesses from "./accesses.js";
import sockets from "./sockets.js";
import methods from "./methods.js";
import gsons from "./gsons.js"

export default class Launch {
    static get pages(){
        return pages;
    }

    static get components(){
        return components;
    }

    static get accesses(){
        return accesses;
    }
    
    static get sockets(){
        return sockets;
    }

    static get methods(){
        return methods;
    }

    static get gsons(){
        return gsons;
    }
}