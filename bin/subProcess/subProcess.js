import { EhpadjsDirectoriesBin } from "../../directories.js";
import fs from "fs";

export class subProcess{
    static get main(){
        return EhpadjsDirectoriesBin.subProcess;
    }

    static set pid(arg=""){
        fs.writeFileSync(this.main + "/pid", arg.toString());
    }
    
    static get pid(){
        return fs.readFileSync(this.main + "/pid", "utf-8");
    }

    static set pidWatch(arg=""){
        fs.writeFileSync(this.main + "/pidWatch", arg.toString());
    }
    
    static get pidWatch(){
        return fs.readFileSync(this.main + "/pidWatch", "utf-8");
    }

    static set isReady(arg=""){
        fs.writeFileSync(this.main + "/isReady", arg.toString());
    }

    static get isReady(){
        return fs.readFileSync(this.main + "/isReady", "utf-8");
    }

    static get error(){
        return class {
            static set message(arg=""){
                fs.writeFileSync(subProcess.main + "/error/message", arg.toString());
            }
        
            static get message(){
                return fs.readFileSync(subProcess.main + "/error/message", "utf-8");
            }
        
            static set timespan(arg=""){
                fs.writeFileSync(subProcess.main + "/error/timespan", arg.toString());
            }
        
            static get timespan(){
                return fs.readFileSync(subProcess.main + "/error/timespan", "utf-8");
            }
        }
    }
}