const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "ivyqpf",
  "private_key_id": "bec066377ca33bc96488a435745cdfca2fbba998",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDSSP6TpDKf0raM\nFWKN/G6HM4QKT2+wyv0xXarO0Xb6HfAkH1pmrp75sSvCsdbL+BDhu4l5eK/HmzIn\nYTJ0zVFczUn1XUJkbDuU4kEyYnT5Q7OrI1yjshhdLrMGeN1vZBdikNgBNBuw1Z5Z\nrB2lt9j3Gjcbq5Y2zmhsjAyD+GEn1Ki5U2yIDk5vXCQlfuGmG3Mnzkajl3PW5vpg\nu93sDRSovCWY8eh4MEI2SR9ahNs5HrwUiNzXpuZLiBdq3VaRr8U6kLYauAPmxLmH\nGwuJvyipJup/TNBYkpXaj1KGRro7eQ8GQ+WvsRIzDdBBXEPPEmXYAkGvD6QmDv0s\n/QLb13vpAgMBAAECggEAAUhcMyrYezSWE/cqbXrJcs4r40M2R3IJhtRPLylEbESj\n+xhs3Pz6L8Q2o96hVIesFLBn54OGsPU/olFbtS4ubZ478gDyX3nwiBk0NBo5I+8X\niLbzwPTcZK8c/PBeS2hlIx8GjkVS2OqIp3vfB2x+aI1yohrTFPz/0o+tIN3yO8Oz\nt2XJHXVDDJtLrbuDkBl4kxpp8xZuwGZQGeWvGaNAYlM/EeS6KeYzMZ3nyDP3ZyKk\nVHHhOXdItqJBm8JC6AK6y4RMOf7cGqdEXETqo2ptBeMODU11vYOV5wffJYJOMD9u\n5UMqEH8Mp1SHpsHgZCHE9KK6u7OE9ebU6yOXEbD6YQKBgQD9K6ua9SUttYE6dGXR\ncGjhXPx65WksXFWlJxaTpbVq5UQzOVBkQyFcavio7Uf2VMieZodn94khgvFFofQq\nihAFngVIJTiDZwD4VGb94JMicrTyzVPCGo2PA/E3XGCF9TL06amkdhFZ5TlRHNvH\nJkYCIyz+3HlsTHKnyvALlXV1uQKBgQDUoqCbJNcxI/DS8IjIu4T9VP5FGQhwQGj8\ntyRATXtZ/A9397IhWDUaGqkQDai711bwUNpxnLVtveHAUwAe4zG5Xq/GyWpODyMB\nX/6PIQu5KhFOZo7hwEriQtRtNhj9U3v2w7VsMGzfSRHTps4zVACvp5YbAIiqiEC2\nGikCnzVPsQKBgQCSCJ2s/Zkbe6X2POv6Wnf0/vkYPrpi/0PbxudL9XrnFSY40eeg\nXeShdYbHkk8/NPqf/A5BF1T/gpN/kgLQguDpDJSJYAbwLPsvQyhBa0gTx8y+fVfC\nECT1iNWcFGoM+zoQcbQMDJrHmuRr+FSB1H7vfrDWtgBISvSb+wBp/iVJ6QKBgQCA\nIc+uLbEPB51jP1btvzIQhlsCwGb5XZbmUmYh6Y7fVqjrnfNVbJXzOQWPiuuW5diZ\nz98Sf2BE1RtojZuRAU9BaPF7VHwetbheZ745+ava1KLBH8QR/ZIibisb9HFylhAp\nTx3QKA4zLxDy/Z1cCM6xCsfFVbkFKj30ficgUVgKwQKBgQDH/DjWo9hkldQVw8Ct\noirGuoQX5luyyvxg0lQ5mSeelI/5qjg/tIwfXnSz2IhIbE1rqeqKm7Q+yh4zd2T0\nvw6/fplJdKkLbsLmlpy+NTxy6VzZq5OwKfRy3Yrmy+1QWcistXP+vlGYdwWhudLN\n3QqJvyaReEHR0cWNUd7Bq8paFA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-esnod@ivyqpf.iam.gserviceaccount.com",
  "client_id": "112246412514121452061",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-esnod%40ivyqpf.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: '', NEED TO ADD THIS??
});

module.exports = admin