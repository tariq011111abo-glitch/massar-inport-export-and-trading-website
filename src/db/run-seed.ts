import "dotenv/config";
import { ensureSeeded } from "./seed";

async function main() {
  await ensureSeeded();
  console.log("Massar database is ready.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
