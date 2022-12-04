import { subProcess } from "../subProcess/subProcess.js";

export default class stop{
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

    main(){
        try{
            if(subProcess.pidWatch)process.kill(Number(subProcess.pidWatch));
            else if(Number(subProcess.pid) != process.pid) process.kill(Number(subProcess.pid));
            if(this.message)console.log("ehpadjs : Process " + subProcess.pid + " is stopped.");
        }catch{
            
        }
        subProcess.pid = "";
        
    }

    message = true;

    prefix = "-";

    options = {
        "m": {
            arg: false,
            fnc: () => {
                this.message = false;
            }
        }
    }
}