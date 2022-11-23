import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { FIREBASE_ADMIN_INJECT, FirebaseAdminSDK } from '@tfarras/nestjs-firebase-admin';
import * as firebase from 'firebase-admin';
const serviceAccount = require('../../config-firebase.json');
// import { firebaseAdmin } from 'src/config/firebase.config';

@Injectable()
export class TestService {
    private firebaseAdmin: firebase.app.App;

    constructor() { // private firebaseAdmin: FirebaseAdminSDK, // @Inject(FIREBASE_ADMIN_INJECT)
        // this.firebaseAdmin = firebaseAdmin();
    }

    async uploadPicture(file) {
        try {
            const fileName = await this.upload(file);
            return fileName;
        } catch (err) {
            return {
                statusCode: 400,
                message: `failed: ${err.message}`,
            };
        }
    }

    async getPicture(fileName, fileFolder = 'uploads') {
        try {
            const file = await this.view(fileName, fileFolder);
            return file;
        } catch (err) {
            return {
                statusCode: 400,
                message: `failed: ${err.message}`,
            };
        }
    }

    private async upload(file, fileFolder = 'uploads', filePrefix = 'img') {
        const bucket = this.firebaseAdmin.storage().bucket();

        const fileName = `${fileFolder}/${filePrefix}_${Date.now()}`;
        const fileUpload = bucket.file(fileName);
        const blobSteam = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobSteam.on('error', (err) => {
            console.log(err);
        });

        blobSteam.on('finish', (data) => {
            console.log('upload complete');
        });

        blobSteam.end(file.buffer);
        return fileName;
    }

    private async view(fileName: string, fileFolder = 'uploads') {
        const bucket = this.firebaseAdmin.storage().bucket();

        const [file] = await bucket.file(`${fileFolder}/${fileName}`).getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 24,
        });

        return file;
    }
}
