import admin from 'firebase-admin';
import * as fs from 'fs';

export const initializeApp = async () => {
  const data = fs.readFileSync('serviceAccountKey.json', 'utf-8');
  const serviceAccount = JSON.parse(data);

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
