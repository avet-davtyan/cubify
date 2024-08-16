import { Express } from "express";

export class CreateCubeBodyDto {
    name: string;
    description?: string;
    backgroundColor?: string;
}

export class CreateCubeFilesDto {
    image1: Express.Multer.File[];
    image2: Express.Multer.File[];
    image3: Express.Multer.File[];
    image4: Express.Multer.File[];
    image5: Express.Multer.File[];
    image6: Express.Multer.File[];
}
