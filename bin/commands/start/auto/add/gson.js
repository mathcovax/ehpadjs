import fs from "fs";
import { Root } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";

export default function gson(path){
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.gson = path;
    const arr = path.replace(Directories.gsons + "/", "").split(Files.extname.gsons).slice(0, -1).join(Files.extname.gsons).split("/");
    Root.gson = {...Root.gson, ...(function findAndSet(obj={}, arr){
        if(arr.length === 1) obj[arr[0]] = {...obj[arr[0]], ...JSON.parse(fs.readFileSync(path, "utf-8"))};
        else obj[arr[0]] = {...obj[arr[0]], ...findAndSet(obj[arr[0]], arr.slice(1))};
        return obj;
    })(Root.gson, arr)};
}