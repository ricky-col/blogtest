import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();
async function test() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    console.log("Connecting pure driver...");
    await client.connect();
    console.log("Connected successfully to server");
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}
test();
