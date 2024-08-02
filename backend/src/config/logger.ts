import { createLogger, transports, format } from "winston";
const { combine, timestamp, label, prettyPrint, colorize, simple } = format;
const logger = createLogger({
  level: "info",
  format: combine(colorize(), simple(), timestamp()),
  transports: [
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

logger.add(
  new transports.Console({
    format: prettyPrint(),
  })
);

export default logger;
