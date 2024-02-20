const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "foodscans-2c874",
  "private_key_id": "0625e5faa7672ebeb542bd23f5f8cdc99c0387f4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCskbriY5/KC0Ut\nuRoYZvnnykm/xqC7aql61XT88rxkJZzP1jYESxNhhk30A+ATy6I8iFjElifO7g8Q\n08+Zzx3O2MWYMsURgfsR9y+wBF0SJUYnpigUMMiVcRwM8JcEvVroqNlQNQHWWUXB\nHUE8f+85GNApXG4YDpIXEmzcZkZs7BAFHvGhSIRd+7tS/Xr7GXY29ern750Lel51\nAgkLENcaXSbwO1C2ABDEU07x16jk3xF7iFNR92L3EGACp13A/mZSvjX0MxPUm1gw\nJg2gC1Ku8ObvNjd2UiCNyujr4d6kOz+LYxQ6wjim9lAf4iVhD5YJ9eRNOUakuZSB\nIF1QtBczAgMBAAECggEAHPj+kmG9gxNvUuTf37byQBszVJJJjA21VJ0f3hP20y2J\nbU9+lCvyng4Jam14Inquy1Ds7lxzZIeNWfrlwOIIFCFK02m6slzLRVHl3Lxuz8wY\nQjHgSruCAa0S041VHYOZDrTCf3fWziEA2BJMUJb+F+z1jewpw7o2hs8eHcbCDikx\nR17yQgmITGEleGo+oxK7bNifyFkfWeptllCCSkBb8J/H8UkBdlJYOAqA7+FqtmcO\nUkGYxqUxurW15Ic3pWWxepwF3xKFy4Ab2EzRGa820S4lPnJ3B9220sJy4BCViJ1q\nma+m2G2BB7XEeqbxYPUkr6s/Nyul7ay9G7VTJouqKQKBgQDbTOs5gYHvhk1yTU+r\nHDXSxUe+hEsWNVxmSPORxxXfA3De1Ul5kRgVKdYW9O5zPj94ElVnwyiWmJOyBdXD\ndbBQog1f/8u/o5qxtlUAaxYKc0aHT2FBgZZkzSS54Avt7e/oqOO3uN+7mmIONzF0\nbE+4PYjeAUjd16sI3tfZ5/tlpwKBgQDJcssNa0etw0oCuKyCA5Jbfa9GipHN5Br0\n0+XgEBq/HE3TDPCFJVRYVZSgDK1ms1sEMkTVoqGnHzE2dm341Z2ip3cxmUiG+zx1\nywYuxMKkkXMVLnA0ynDkhwkHIeehz6fjV22wlxh0sQfXJyyDoq1C9xMgQJCkhK7P\nMGhSXdZLlQKBgQDUeWUalWDYOq6ExWUgKzf224+Uhkbd4JuCusHLBzIongPY0pva\nvfqwXpWALpVtcO07n7/BxfNoXbIT9NVVCIzowunkjkjRh2kVL8yRmC+FtoSqCv32\n4uBdD+m6cdn9D+C28hOX6PZUpNLGZTF0VJC0uGIIfwQjdJbRBF/sT3hi1wKBgQDH\nlrifnv7xpl+ZuqcQWcGUbD5QwdIcEDi1AYzsJoiZeM2SoWtcP9QFgSU0Pds/ucwf\nqD6S/AL1te3obAYhWGRKV2m89oXpVtpcSr7hb4j5zDIddlkttLWNdkz3iBwbMcbB\ndEn1gH52fz+pZ+KuuWq4wltsxQuKNPuNxARYNyiu0QKBgEmk+xBBbTSRhkMrEsmX\nMFwd7U0Pv5yMM6W//Divn+vEII9Kw6QOEsIyo4aKvfW+eiqeBOjbTKvA3/OhVdO5\nb48q9ZgqonFJVmbmsi15ut4FTChqiW+UDQMephSUk5tKUzeip4fFQMWd9/HLuyKD\n8MgWmkv13esEEm+FG7ntp3FU\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-qeg4r@foodscans-2c874.iam.gserviceaccount.com",
  "client_id": "102274562815197919492",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qeg4r%40foodscans-2c874.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: '', NEED TO ADD THIS??
});

module.exports = admin