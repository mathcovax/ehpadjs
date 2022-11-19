#! /usr/bin/env node

import { execSync, spawnSync } from "child_process";
import fs from "fs";
import { EhpadjsDirectories, EhpadjsDirectoriesBin } from "../directories.js";

var args = process.argv;
args = args.slice(2, process.argv.length);

export default class cmd{
    constructor(args=false){
        if(args === false) return;
        if(!process.env["ehpadjs"]){
            process.on("exit", (e) => {
                if(e === "restart"){
                    spawnSync(process.argv.shift(), process.argv, {
                        env: {...process.env, "ehpadjs": args[0]},
                        cwd: process.cwd(),
                        stdio: "inherit",
                    });
                }
            })
            this.constructor.reboot();
        }
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

        (async()=>{
            switch (args.splice(0, 1)[0]) {
                case "start":
                    new (await import("file:///" + EhpadjsDirectoriesBin.commands + "/start/start.js")).default(args);
                    break;

                case "stop":
                    new (await import("file:///" + EhpadjsDirectoriesBin.commands + "/stop.js")).default(args);
                    break;

                case "status":
                    new (await import("file:///" + EhpadjsDirectoriesBin.commands + "/status.js")).default(args);
                    break;
                
                case "update":
                    console.log("Starting update of ehpadjs...");
                    execSync("npm cache ls ehpadjs | xargs npm cache clean --force", {stdio: "ignore"});
                    execSync("npm install ehpadjs@latest -y", {stdio: "ignore"});
                    this.constructor.command("version");
                    execSync("npm cache ls ehpadjs | xargs npm cache clean --force", {stdio: "ignore"})
                    break;

                case "config":
                    new (await import("file:///" + EhpadjsDirectoriesBin.commands + "/config.js")).default(args);
                    break;
                
                case "version":
                    console.log("ehpadjs " + JSON.parse(fs.readFileSync(EhpadjsDirectories.main + "/package.json")).version + "v");
                    break;
            }
        })();
    }

    prefix = "--"

    options = {

    }

    static reboot(message){
        if(message){
            console.log("");
            console.log(message);
            console.log("");
        }
        process.exit("restart");
    }

    static command(cmd, args=[]){
        return spawnSync("npx", ["ehpadjs", cmd, ...args], {env: {...process.env}, "ehpadjs": cmd, cwd: process.cwd(), stdio: "inherit"});
    }

}

new cmd(args);