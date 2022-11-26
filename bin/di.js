import fs from "fs"

export default async function di(path){
    let tempath = path.split("/");
    let temp = "tmp-ehpadjs-" + tempath.pop();
    tempath = tempath.join("/") + "/" + temp;
    fs.writeFileSync(tempath, fs.readFileSync(path));
    try{
        let result = await import("file:///" + tempath);
        fs.unlink(tempath, () => {});
        return result;
    }catch(e){
        fs.unlink(tempath, () => {});
        throw e;
    }
}