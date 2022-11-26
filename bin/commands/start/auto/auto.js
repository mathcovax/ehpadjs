import fs from "fs";
import { Directories, Files, Models } from "../../../../directories.js";
import Remove from "./remove/remove.js";
import Launch from "./launch/launch.js";
import Add from "./add/add.js";
import { Root } from "vieuxjs";
import { args } from "../spawn.js";

export default class Auto{
    static async init(){
        if(!fs.existsSync(Directories.workdir))fs.mkdirSync(Directories.workdir);
        if(!fs.existsSync(Directories.scss) && args.scss === true)fs.mkdirSync(Directories.scss);
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
        await this.Launch.sockets();
        this.Launch.pages();
        await this.Launch.accesses();
        await this.Launch.methods();
        await this.Launch.handlers();
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