// utils/logger.js
class Logger {
    static logRequest(req) {
      const { method, originalUrl, body, query, params } = req;
      const timestamp = new Date().toISOString();
  
      console.log(`[${timestamp}] ${method} ${originalUrl}`);
      console.log(`Query:`, query);
      console.log(`Params:`, params);
      console.log(`Body:`, body);
      console.log('-----------------------------');
    }
  
    static logError(error, req) {
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}] ERROR in ${req.method} ${req.originalUrl}`);
      console.error(error);
      console.error('-----------------------------');
    }
  }
  
  module.exports = Logger;
  