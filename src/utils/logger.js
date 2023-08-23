import { createLogger } from "winston";
import winston from 'winston';

const logger = createLogger();


export default logger;

// Definir niveles de prioridad
export const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
};
  
  // Configuración para logger de desarrollo
export const developmentLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()]
});
  
  // Configuración para logger de producción
export const productionLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ]
});


//error
//warn 
//info
//debug
//silly