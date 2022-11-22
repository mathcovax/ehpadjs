import fs from "fs";
import { Directories, Files, Models } from "../../../../directories.js";
import Remove from "./remove/remove.js";
import Launch from "./launch/launch.js";
import Add from "./add/add.js";
import { Root } from "vieuxjs";

export default class Auto{
    static async init(){
        if(!fs.existsSync(Directories.workdir))fs.mkdirSync(Directories.workdir);
        if(!fs.existsSync(Directories.assets))fs.mkdirSync(Directories.assets);
        Root.assetsDir = Directories.assets;
        if(!fs.existsSync(Files.index) || fs.readFileSync(Files.index, "utf-8") === "")Models.rw.index = Files.index;
        Root.defaultIndex = Files.index;
        if(!fs.existsSync(Files.loadingOverlay) || fs.readFileSync(Files.loadingOverlay, "utf-8") === "")Models.rw.loadingOverlay = Files.loadingOverlay;
        Root.loadingOverlay = Files.loadingOverlay;
        if(!fs.existsSync(Files.gson) || fs.readFileSync(Files.gson, "utf-8") === "")Models.rw.gson = Files.gson;
        Root.gson = JSON.parse(fs.readFileSync(Files.gson));

        this.Launch.gsons();
        this.Launch.components();
        this.Launch.pages();
        await this.Launch.accesses();
        if(Root.webSocket === true)await this.Launch.sockets();
        await this.Launch.methods();
    }

    static get Launch(){
        return Launch;
    }

    static get Add(){
        return Add;
    }

    static get Remove(){
        return Remove;
    }
}