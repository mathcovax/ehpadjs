import fs from "fs";
import { Directories, Files, Models } from "../../../../directories.js";
import pages from "./launch/pages.js";
import page from "./add/page.js";
import pson from "./add/pson.js";
import components from "./launch/components.js";
import component from "./add/component.js";
import accesses from "./launch/accesses.js";
import access from "./add/access.js";
import { Root } from "vieuxjs";

export default class Auto{
    static async init(){
        if(!fs.existsSync(Directories.workdir))fs.mkdirSync(Directories.workdir);
        if(!fs.existsSync(Directories.assets))fs.mkdirSync(Directories.assets);
        Root.assetsDir = Directories.assets;
        if(!fs.existsSync(Files.index) || fs.readFileSync(Files.index) === "")Models.rw.index = Files.index;
        Root.defaultIndex = Files.index;
        if(!fs.existsSync(Files.loadingOverlay) || !fs.readFileSync(Files.loadingOverlay) === "")Models.rw.loadingOverlay = Files.loadingOverlay;
        Root.loadingOverlay = Files.loadingOverlay;
        if(!fs.existsSync(Files.gson) || fs.readFileSync(Files.gson) === "")Models.rw.gson = Files.gson;
        Root.gson = JSON.parse(fs.readFileSync(Files.gson));

        this.Launch.components();
        this.Launch.pages();
        await this.Launch.accesses();
    }

    static get Launch(){
        return class {
            static get pages(){
                return pages;
            }

            static get components(){
                return components;
            }

            static get accesses(){
                return accesses;
            }
        }
    }

    static get add(){
        return class {
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
        }
    }

    static get remove(){
        return class {
            
        }
    }
}