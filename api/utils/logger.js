const winston = require("winston");
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

winston.loggers.add("OrderLogger", {
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "orders.log", level: "error" }),
  ],
  defaultMeta: {service: 'OrderService'}
});

winston.loggers.add("PaymentLogger", {
  format: json(),
  transports: [
    new winston.transports.File({ filename: "payment.log"}),
  ],
  defaultMeta: {service: 'PaymentService'}
});



