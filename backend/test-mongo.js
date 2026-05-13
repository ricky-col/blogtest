import { connect } from "mongoose";
import { config } from "dotenv";
config();
async function test() {
  try {
    console.log("Connecting...");
    await connect(process.env.MONGO_URI, { family: 4 });
    console.log("Connected successfully using family: 4");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}
test();
