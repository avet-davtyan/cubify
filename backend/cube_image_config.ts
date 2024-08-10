import * as dotenv from "dotenv";

dotenv.config();

let cubeImageDir = process.env.CUBE_IMAGES;

if (!cubeImageDir) {
    cubeImageDir = "cube_images";
}

export default cubeImageDir;
