import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3serviceService {

    private s3: S3;

    constructor() {
        this.s3 = new S3();
    }

    async uploadVideo(dataBuffer: Buffer, fileName: string, fileMimeType: string): Promise<any> {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: fileName,
            ContentType: fileMimeType
        }).promise();
        console.log('uploadResult.Key', uploadResult.Key);
        console.log('uploadResult.Location', uploadResult.Location);
        return {
            key: uploadResult.Key,
            url: uploadResult.Location,
        };
    }


    getVideoSegmentURL(segmentNumber: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const segmentKey = `segments/segment${segmentNumber}.mp4`; // Adjust the naming convention and path according to your actual setup
            const getParams = {
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Key: segmentKey,
            };
            this.s3.getObject(getParams, async (err, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    const objectData = Buffer.from(data.Body, 'binary').toString('base64');
                    const videoData = 'data:video/mp4;base64,' + objectData;
                    resolve(videoData);
                }
            });
        });
    }

    
    getAttachmentImage(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let getParams = {
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Key: key,
            };
            const s3 = new S3();
            s3.getObject(getParams, async (err, data: any) => {
                if (err) {
                    reject(err);
                } else {

                    key = key.toLocaleLowerCase();

                    if (key.endsWith('.png')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:image/png;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.jpg')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:image/jpg;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.jpeg')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:image/jpeg;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.docx')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:application/pdf;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.xlsx')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:application/xlsx;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.pdf')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:application/pdf;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.tiff')) {
                        let objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );
                        let imageData = 'data:application/tiff;base64,' + objectData;
                        resolve(imageData);
                    } else if (key.endsWith('.mp4')) {
                        const objectData = Buffer.from(data.Body, 'binary').toString(
                            'base64',
                        );;
                        const videoData = 'data:video/mp4;base64,' + objectData;
                        resolve(videoData);
                    }
                    else {
                        resolve(data.Body.toString('utf-8'));
                    }
                }
            });
        });
    }
}
