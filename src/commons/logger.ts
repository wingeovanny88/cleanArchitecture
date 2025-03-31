export const customLogger = {
  log: (message: string, context?: any) => {
    console.log(`[LOG] ${message}`, context || '');
  },
  error: (message: string, context?: any) => {
    console.error(`[ERROR] ${message}`, context || '');
  },
};
