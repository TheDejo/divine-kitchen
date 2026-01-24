import { constants } from '../config/constants';

const { ENVIRONMENT } = constants;

const logger = {
  error: <T>(log: T): void => {
    if (ENVIRONMENT.development) {
      console.error('❌ ERROR:', log);
    }
  },
  info: <T>(log: T): void => {
    if (ENVIRONMENT.development) {
      console.log('ℹ️  INFO:', log);
    }
  },
  warn: <T>(log: T): void => {
    if (ENVIRONMENT.development) {
      console.warn('⚠️  WARN:', log);
    }
  }
};

export default logger;
