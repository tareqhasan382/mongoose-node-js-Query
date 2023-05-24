import dayjs from "dayjs";
//const pino = require('pino');
import pino from "pino";
import PinoPretty from "pino-pretty";

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      },
  prettifier: PinoPretty,
  timestamp: () => `"time :" ${dayjs().format()}`,
});

export {log};