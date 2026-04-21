import { app } from "./app.js";
import { config } from "./config/env.js";
import { connectDb } from "./db.js";
import { logger } from "./utils/logger.js";

async function main() {
  await connectDb();
  app.listen(config.port, () => {
    logger.info(`Server listening on http://localhost:${config.port}`);
  });
}

main().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});
