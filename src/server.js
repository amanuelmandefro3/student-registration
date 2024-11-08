// src/server.js
const app = require('./app');
const { logger } = require('./interfaces/middleware/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
