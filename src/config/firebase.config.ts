import * as firebase from 'firebase-admin';
const serviceAccount = require('../../config-firebase.json');

export function firebaseAdmin(): firebase.app.App {
    return firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        storageBucket: 'crunzex-softarch.appspot.com',
    });
}

export class FirebaseService {
    private firebaseAdmin: firebase.app.App;
    
    constructor() {
        this.firebaseAdmin = firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            storageBucket: 'crunzex-softarch.appspot.com',
        });
    }

    public get firebaseService(): firebase.app.App {
        return this.firebaseAdmin;
    }
}