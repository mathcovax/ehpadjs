import { execSync } from "child_process";
import { Files, Directories } from "../../../../../directories.js";
import { args } from "../../spawn.js";
import fs from "fs";

export default function scss(){
    if(args.scss === false)return;
    if(!fs.existsSync(Directories.scss))fs.mkdirSync(Directories.scss);
    if(fs.existsSync(Files.Scss.input))execSync("npx sass " + Files.Scss.input + ":" + Files.Scss.output, { stdio: "inherit" });
}