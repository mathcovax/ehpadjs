import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { VieuxjsDirectoriesFile } from "vieuxjs/lib/directories.js";
import fs from "fs";

export class EhpadjsDirectories{
    static #main = resolve(dirname(fileURLToPath(import.meta.url)));
    static get main(){
        return this.#main;
    }

    static get bin(){
        return this.main + "/bin";
    }

    static get src(){
        return this.main + "/src";
    }
}

export class EhpadjsDirectoriesBin{
    static get main(){
        return EhpadjsDirectories.bin;
    }

    static get commands(){
        return this.main + "/commands";
    }

    static get subProcess(){
        return this.main + "/subProcess";
    }
}

export class EhpadjsDirectoriesSrc{
    static get main(){
        return EhpadjsDirectories.src;
    }

    static get scripts(){
        return this.main + "/scripts";
    }

    static get models(){
        return this.main + "/models";
    }
}

export class Models{
    static get main(){
        return EhpadjsDirectoriesSrc.models;
    }

    static page = this.main + "/page.html";

    static component = this.main + "/component.html";

    static access = this.main + "/access.js";

    static method = this.main + "/method.js";

    static socket = this.main + "/socket.js";

    static pson = this.main + "/pson.json";

    static get gson(){
        return this.main + "/gson.json";
    }

    static get config(){
        return this.main + "/ehpad.config.js";
    }

    static get index(){
        return VieuxjsDirectoriesFile.mainIndex;
    }

    static get loadingOverlay(){
        return VieuxjsDirectoriesFile.loadingOverlay;
    }

    static get rw(){
        return class {
            static get page(){
                return fs.readFileSync(Models.page, "utf-8");
            }
            static set page(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.page);
            }

            static get component(){
                return fs.readFileSync(Models.component, "utf-8");
            }
            static set component(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.component);
            }

            static get access(){
                return fs.readFileSync(Models.access, "utf-8");
            }
            static set access(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.access);
            }

            static get method(){
                return fs.readFileSync(Models.method, "utf-8");
            }
            static set method(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.method);
            }

            static get socket(){
                return fs.readFileSync(Models.socket, "utf-8");
            }
            static set socket(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.socket);
            }

            static get pson(){
                return fs.readFileSync(Models.pson, "utf-8");
            }
            static set pson(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.pson);
            }

            static get gson(){
                return fs.readFileSync(Models.gson, "utf-8");
            }
            static set gson(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.gson);
            }

            static get config(){
                return fs.readFileSync(Models.config, "utf-8");
            }
            static set config(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.config);
            }

            static get index(){
                return fs.readFileSync(Models.index, "utf-8");
            }
            static set index(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.index);
            }

            static get loadingOverlay(){
                return fs.readFileSync(Models.loadingOverlay, "utf-8");
            }
            static set loadingOverlay(arg){
                try{
                    fs.mkdirSync(arg.split("/").slice(0, -1).join("/"), {recursive: true});
                }catch{}
                fs.writeFileSync(arg, this.loadingOverlay);
            }
        }
    }
}

export class Directories{
    static get main(){
        return resolve("./");
    }

    static name_workdir = "src";
    static get workdir(){
        return resolve(this.main, this.name_workdir);
    }

    static name_assets = "assets";
    static get assets(){
        return resolve(this.workdir, this.name_assets);
    }

    static name_components = "components";
    static get components(){
        return resolve(this.workdir, this.name_components);
    }

    static name_pages = "pages";
    static get pages(){
        return resolve(this.workdir, this.name_pages);
    }

    static name_methods = "methods";
    static get methods(){
        return resolve(this.workdir, this.name_methods);
    }

    static name_accesses = "accesses";
    static get accesses(){
        return resolve(this.workdir, this.name_accesses);
    }

    static name_psons = "psons";
    static get psons(){
        return resolve(this.workdir, this.name_psons);
    }

    static sockets = "sockets";
    static get sockets(){
        return resolve(this.workdir, this.name_sockets);
    }
}

export class Files{
    static get config(){
        return resolve(Directories.main, "ehpad.config.mjs");
    }

    static name_loadingOverlay = "loadingOverlay.html";
    static get loadingOverlay(){
        return resolve(Directories.workdir, this.name_loadingOverlay);
    }

    static name_index = "index.html";
    static get index(){
        return resolve(Directories.workdir, this.name_index);
    }

    static name_gson = "gson.json";
    static get gson(){
        return resolve(Directories.workdir, this.name_gson);
    }

    static get extname(){
        return class {
            static pages = ".html";

            static components = ".html";

            static methods = ".mjs";

            static accesses = ".mjs";
            
            static sockets = ".mjs";

            static psons = ".json";
        }
    }
}

