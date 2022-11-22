import cmd from "../../bin.js";
import { spawnSync, spawn } from "child_process";
import { EhpadjsDirectoriesBin, Files } from "../../../directories.js";
import { subProcess } from "../../subProcess/subProcess.js";
import fs from "fs";

export default class start extends cmd{
    constructor(args){
        super();
        for(let index = 0; index < args.length; index++){
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

        this.main(args);
    }

    async main(args){
        if(!fs.existsSync(Files.config)){
            cmd.command("config");
        }
        if(subProcess.pid !== ""){
            cmd.command("stop", ["-m"]);
        }
        let config = (await import("file:///" + Files.config)).default;
        let a = JSON.stringify({
            import: this.import || config.import,
            port: this.port || config.port,
            callback: this.callback || config.callback.toString(),
            watcher: this.watcher || config.watcher,
            nodemon: this.nodemon || config.nodemon,
            commands: this.commands || config.commands,
            detached: this.detached || config.detached,
            webSocket: this.webSocket || config.webSocket,
            webStore: this.webStore || config.webStore,
            pson: this.pson || config.pson
        });
        this.spawn("node", [EhpadjsDirectoriesBin.commands + "/start/spawn.js", `'${a}'`], {env: {...process.env}, title:"ehpadjs", ...this.spawnOption});
    }

    spawn = spawnSync;

    spawnOption = {
        cwd: process.cwd(),
        stdio: "inherit",
    };

    prefix = "-";

    port = false;

    callback = false;

    import = false;

    webSocket = false;

    webStore = false;
    
    watcher = false;

    nodemon = false;

    commands = false;

    detached = false;

    pson = false;

    options = {
        "cmd": {
            arg: true,
            fnc: (arg) => {
                this.commands = arg.split("&&");
            }
        },
        "d": {
            arg: false,
            fnc: () => {
                this.spawn = (a, b, c) => {
                    let temp = spawn(a, b, c);
                    temp.unref();

                    console.log("Vieujs : launch of process...");
                    let timespan = Date.now();
                    const inter = setInterval(() => {
                        if(subProcess.pid && (subProcess.isReady || this.nodemon || this.watcher)){
                            clearInterval(inter);
                            console.log("Vieujs : " + (this.startMessage || "ready"));
                        }
                        else if(!subProcess.isReady && Number(subProcess.error.timespan || 0) >= timespan){
                            clearInterval(inter);
                            console.log("Vieujs error :");
                            console.error(subProcess.error.message);
                        }
                    }, 100);
                };
                this.detached = true;
                this.spawnOption = { detached: true, stdio: "ignore", cwd: process.cwd() };
            }
        },
        "p": {
            arg: true,
            fnc: (arg) => {
                this.port = arg;
            }
        },
        "cb": {
            arg: true,
            fnc: (arg) => {
                this.callback = arg;
            }
        },
        "i": {
            arg: true,
            fnc: (arg) => {
                this.import = arg.split("&&");
            }
        },
        "socket": {
            arg: false,
            fnc: () => {
                this.webSocket = true;
            }
        },
        "store": {
            arg: false,
            fnc: () => {
                this.webStore = true;
            }
        },
        "w": {
            arg: false,
            fnc: () => {
                this.watcher = true;
            }
        },
        "nm": {
            arg: false,
            fnc: () => {
                this.nodemon = true;
            }
        },
        "pson": {
            arg: false,
            fnc: () => {
                this.pson = true;
            }
        }
        
    }
}