import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { join } from "path";
import { Request } from "express";

@Controller("cube")
export class CubeController {
  @Get()
  get() {
    return "cubes";
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
      { name: "image5", maxCount: 1 },
      { name: "image6", maxCount: 1 },
    ])
  )
  async uploadFile(@UploadedFiles() files, @Body() userData: any) {
    const image1 = files["image1"][0];
    console.log(image1);
    try {
      // Create a random directory name
      const randomDirectoryName = "cube_images/" + "avet";
      fs.mkdirSync(randomDirectoryName, { recursive: true });

      const randomFileName = Math.random().toString(36).substring(7) + ".jpg";

      // Construct the full path to save the image
      const imagePath = join(randomDirectoryName, randomFileName);

      // Write the image buffer to the file
      fs.writeFile(imagePath, image1.buffer, () => {
        console.log(imagePath);
      });

      return imagePath;
    } catch (error) {
      // Handle error appropriately
      console.log(error);
    }
  }
}
