#! /usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import { EhpadjsDirectories } from "../directories.js";
import start from "./commands/start/start.js";
import stop from "./commands/stop.js";
import config from "./commands/config.js";
import status from "./commands/status.js";

var args = process.argv;
args = args.slice(2, process.argv.length);

export default class cmd{
    constructor(args=false){
        if(args === false) return;
        for(let index = 1; index < args.length; index++){
            if(args[index].startsWith(this.prefix) && this.options[args[index].replace(this.prefix, "")]){
                if(this.options[args[index].replace(this.prefix, "")].arg){
                    this.options[args[index].replace(this.prefix, "")].fnc(args[index+1]);
                    args.splice(index, 2);
                }
                else{
                    this.options[args[index].replace(this.prefix, "")].fnc();
                    args.splice(index, 1);
                }
                index--;
            }
        }
        switch (args.splice(0, 1)[0]) {
            case "start":
                new start(args);
                break;

            case "stop":
                new stop(args);
                break;

            case "status":
                new status(args);
                break;
            
            case "update":
                console.log("Starting update of ehpadjs...");
                execSync("npm cache ls ehpadjs | xargs npm cache clean --force", {stdio: "ignore"});
                execSync("npm install ehpadjs@latest -y", {stdio: "ignore"});
                this.constructor.command("version");
                execSync("npm cache ls ehpadjs | xargs npm cache clean --force", {stdio: "ignore"})
                break;

            case "config":
                new config(args);
                break;
            
            case "version":
                console.log("ehpadjs " + JSON.parse(fs.readFileSync(EhpadjsDirectories.main + "/package.json")).version + "v");
                break;
        }
    }

    prefix = "--"

    options = {

    }

    static command(args){
        return new cmd(args.split(" "));
    }

}

new cmd(args);