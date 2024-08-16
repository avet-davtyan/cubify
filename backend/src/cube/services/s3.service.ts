import { S3Client, PutObjectCommand, PutObjectAclCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";

@Injectable()
export class S3Service {
    private bucketName: string;
    private bucketRegion: string;
    private accessKey: string;
    private secretAccessKey: string;

    private s3: S3Client;

    constructor() {
        this.bucketName = process.env.BUCKET_NAME;
        this.bucketRegion = process.env.BUCKET_REGION;
        this.accessKey = process.env.ACCESS_KEY;
        this.secretAccessKey = process.env.SECRET_ACCESS_KEY;

        this.s3 = new S3Client({
            credentials: {
                accessKeyId: this.accessKey,
                secretAccessKey: this.secretAccessKey,
            },
            region: this.bucketRegion,
        });
    }

    async putObject(file: Express.Multer.File, fileName: string) {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read",
            });
            const response = await this.s3.send(command);
            return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteObject(fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
        });

        const response = await this.s3.send(command);
    }
}
