import admin from "firebase-admin";

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID as string,
        privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY as string).replace(
          /\\n/g,
          "\n"
        ),
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      }),
    });
  }
} catch (error: any) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const storage = admin.firestore();
