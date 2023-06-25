function replaceAll(str: string, find: string, replace: string) {
  if(!str) return str
  return str.replace(new RegExp(find, 'g'), replace);
}

export const GCJson = {
  "type": "service_account",
  "project_id": "hackathon-survival-guide",
  "private_key_id": process.env.GC_PRIVATE_KEY_ID,
  "private_key": replaceAll(process.env.GC_PRIVATE_KEY as string, "\\\\n", "\n"),
  "client_email": "onerecord2@hackathon-survival-guide.iam.gserviceaccount.com",
  "client_id": "115533632857953660552",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/onerecord2%40hackathon-survival-guide.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
