import { isProdLevel } from '@/utils/utils';

export const prodConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const devConfig = {
  apiKey: 'AIzaSyBCL3Hqu9z9gJMQNaLMM776KdzuF-2S3pg',
  authDomain: 'dev-jennie-harang-conners.firebaseapp.com',
  projectId: 'dev-jennie-harang-conners',
  storageBucket: 'dev-jennie-harang-conners.appspot.com',
  messagingSenderId: '226162039421',
  appId: '1:226162039421:web:c48e322d66865f2467ef14',
};

const firebaseConfig = (env: string) => {
  if (isProdLevel(env)) {
    return prodConfig;
  }

  return devConfig;
};

export default firebaseConfig;
