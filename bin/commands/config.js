import fs from "fs";
import { Files, Models } from "../../directories.js";

export default class config{
    constructor(args=[]){
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

    async main(){
        if(!fs.existsSync(Files.config)){
            Models.rw.config = Files.config;
            console.log("ehpadjs: The config file was created.");
        }
        else{
            let temp = (await import("file:///" + Files.config)).default;
            let config = (await import("file:///" + Models.config)).default;
            for(const key in config){
                if(temp[key] === undefined){
                    fs.writeFileSync(Files.config, "/*\n" + fs.readFileSync(Files.config, "utf-8") + "*/\n\n" + Models.rw.config);
                    console.log("ehpadjs: The config file was updated.");
                    return
                }
            }
            console.log("ehpadjs: The config file already exists in this project.");
        }
    }

    prefix = "-";

    options = {

    }
}