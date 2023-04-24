import * as admin  from 'firebase-admin';
import { v4 as uuidV4 } from 'uuid';
import serviceAccount from "./config.json"

const serviceAccountObject = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject),
  storageBucket: 'mbv1-bc87e.appspot.com'
});

const bucket = admin.storage().bucket();

export async function uploadImageToFirebase(filename : any, filePath : any) {
  const newFilename = `${uuidV4()}_${filename}.png`;

  await bucket.upload(filePath, {
    destination: newFilename
  });

  const file = bucket.file(newFilename);
   const url = await file.getSignedUrl({
     action: 'read',
     expires: '03-17-2025' // Expires on March 17, 2025
   });

  return url;
  
}

