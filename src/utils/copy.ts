import { cp } from "node:fs";
import { resolve } from "node:path";
import { __dirname } from "../index";

function copy() {
    cp(
        resolve(__dirname, "./license-templates"), 
        resolve(__dirname, "../dist/license-templates"), 
        { recursive: true }, 
    (err) => {
        if(err) console.error(err)
    })
}

copy()