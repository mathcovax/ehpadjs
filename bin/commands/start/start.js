import { spawnSync, spawn } from "child_process";
import { EhpadjsDirectoriesBin, Files } from "../../../directories.js";
import { subProcess } from "../../subProcess/subProcess.js";
import cmd from "../../bin.js";
import fs from "fs";

export default class start{
    constructor(args){
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
            cmd.command("stop -m");
        }

        let config = (await import("file:///" + Files.config)).default;

        let a = {
            import: this.import || config.import,
            port: this.port || config.port,
            callback: this.callback || config.callback.toString(),
            hotreload: this.hotreload || config.hotreload,
            watch: this.watch || config.watch,
            commands: this.commands || config.commands,
            detached: this.detached || config.detached,
            sockets: this.sockets || config.sockets,
            webStore: this.webStore || config.webStore,
            psons: this.psons || config.psons,
            gsons: this.gsons || config.gsons,
            scss: this.scss || config.scss,
            ignoreFiles: this.ignoreFiles || config.ignoreFiles,
            handlers: this.handlers || config.handlers,
        };

        if(a.watch === true)this.spawnFile = "/start/watch/spawn.js";
        else if(a.hotreload === true)this.spawnFile = "/start/hotreload/spawn.js";
        this.spawn("node", [EhpadjsDirectoriesBin.commands + this.spawnFile, `'${JSON.stringify(a)}'`], {env: {...process.env}, title:"ehpadjs", ...this.spawnOption});
    }

    spawn = spawnSync;

    spawnOption = {
        cwd: process.cwd(),
        stdio: "inherit",
    };

    spawnFile = "/start/spawn.js";

    prefix = "-";

    port = false;

    callback = false;

    import = false;

    sockets = false;

    webStore = false;
    
    hotreload = false;

    watch = false;

    commands = false;

    detached = false;

    psons = false;

    gsons = false;

    scss = false;

    ignoreFiles = false;

    handlers = false;

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
                        if(subProcess.pid && (subProcess.isReady || this.watch || this.watcher)){
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
        "sockets": {
            arg: false,
            fnc: () => {
                this.sockets = true;
            }
        },
        "store": {
            arg: false,
            fnc: () => {
                this.webStore = true;
            }
        },
        "nm": {
            arg: false,
            fnc: () => {
                
            }
        },
        "psons": {
            arg: false,
            fnc: () => {
                this.psons = true;
            }
        },
        "if": {
            arg: true,
            fnc: (arg) => {
                this.ignoreFiles = arg.split("&&");
            }
        },
        "gsons": {
            arg: false,
            fnc: () => {
                this.gsons = true;
            }
        },
        "scss": {
            arg: false,
            fnc: () => {
                this.scss = true;
            }
        },
        "handlers": {
            arg: false,
            fnc: () => {
                this.handlers = true;
            }
        },
        "watch": {
            arg: false,
            fnc: () => {
                this.watch = true;
            }
        },
        "hotreload": {
            arg: false,
            fnc: () => {
                this.hotreload = true;
            }
        },
    }
}