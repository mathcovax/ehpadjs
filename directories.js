import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { VieuxjsDirectoriesFile } from "vieuxjs/lib/directories.js"

export class EhpadjsDirectories{
    static #main = resolve(dirname(fileURLToPath(import.meta.url)));
    static get main(){
        return this.#main;
    }

    static get bin(){
        return this.main + "/bin";
    }

    static get auto(){
        return this.main + "/auto";
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

export class EhpadjsDirectoriesAuto{
    static get main(){
        return EhpadjsDirectories.auto;
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

    static gson = this.main + "/gson.json";

    static method = this.main + "/method.js";

    static socket = this.main + "/socket.js";

    static get config(){
        return this.main + "/ehpad.config.js";
    }

    static get mainIndex(){
        return VieuxjsDirectoriesFile.mainIndex;
    }

    static get loadingOverlay(){
        return VieuxjsDirectoriesFile.loadingOverlay;
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
}