import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function gson(path){
    const arr = path.replace(Directories.gsons + "/", "").split(Files.extname.gsons).slice(0, -1).join(Files.extname.gsons).split("/");
    Root.gson = {...Root.gson, ...(function findAndSet(obj={}, arr){
        if(arr.length === 1) delete obj[arr[0]];
        else obj[arr[0]] = {...obj[arr[0]], ...findAndSet(obj[arr[0]], arr.slice(1))};
        return obj;
    })(Root.gson, arr)};
}