import watcher from "watcher";
import { subProcess } from "../../subProcess/subProcess.js";
import { spawn } from "child_process";
import { Directories, EhpadjsDirectoriesBin, Files } from "../../../directories.js";
import { resolve } from "path";

const argv = process.argv;
argv[1] = EhpadjsDirectoriesBin.commands + "/start/spawn.js";
const args = JSON.parse(argv[2].substring(1).substring(0, argv[2].length-2));
subProcess.pidWatch = process.pid;

process.on("exit", (e) => {
    subProcess.pidWatch = "";
    try{
        if(subProcess.pid)process.kill(Number(subProcess.pid));
    }catch{}
    subProcess.pid = "";
});

async function launch(){
    await new Promise((resolve) => {
        spawn(argv[0], argv.slice(1), {
            env: {...process.env},
            cwd: process.cwd(),
            stdio: "inherit",
            title:"ehpadjs",
        })
        .on("close", (code) => {
            if(code === null)resolve();
        })
    })
    
    launch();
}

function ignore(path){
    if(path.indexOf("node_modules") >= 0)return true;
    if(path.indexOf("tmp-ehpadjs-") >= 0)return true;
    if(path === Files.config)return true;
    for(const file of args.ignoreFiles){
        if(path.startsWith(resolve(file)))return true;
    }
    return false;
};

(new watcher(Directories.main, {ignoreInitial: true, recursive: true, ignore: ignore})).on("all", (event, path) => {
    console.log("");
    console.log("restarting...");
    console.log("");
    if(subProcess.pid)process.kill(Number(subProcess.pid));
    else launch();
})

console.log("Starting with watch...");
console.log("");
launch();