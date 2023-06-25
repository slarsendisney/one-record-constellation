import { storage } from "../../firebase-admin";
import { authenticate } from "./authenticate";

export async function getLogisticsObjects(server_url: string) {
    const auth = await authenticate(
      process.env.ONE_RECORD_CLIENT_ID,
      process.env.ONE_RECORD_CLIENT_SECRET,
      process.env.ONE_RECORD_ENDPOINT as string,
      process.env.ONE_RECORD_SCOPE
    );
  
    const { access_token } = auth;
  
    try {
      const doc = await storage.collection("data").doc("logistics-objects").get();
      const ids = doc.data()?.ids;
  
      const res = await Promise.all(
        ids.map(async (id: string) => {
          const res = await fetch(`${server_url}/logistics-objects/${id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          const resJson = await res.json();
          return resJson;
        })
      );
  
      return res;
    } catch (error) {
      console.log(error);
    }
  }