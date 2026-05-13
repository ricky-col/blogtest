import { connect } from "mongoose";
import { config } from "dotenv";
config();
async function test() {
  try {
    console.log("Connecting...");
    const directUri = "mongodb://blogdb:ricky123@ac-pabxyr2-shard-00-00.s2s15kn.mongodb.net:27017,ac-pabxyr2-shard-00-01.s2s15kn.mongodb.net:27017,ac-pabxyr2-shard-00-02.s2s15kn.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-122ua4-shard-0&authSource=admin&retryWrites=true&w=majority";
    await connect(directUri);
    console.log("Connected successfully to direct URI!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}
test();
