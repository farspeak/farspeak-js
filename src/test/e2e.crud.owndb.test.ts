import "dotenv/config";
import { Farspeak } from "../../src/farspeak";

const app = "";
const env = "";
const backendToken = "";
const publicKey = "";
const secretKey = "";
const vectorIndexName = "";
const farspeak = new Farspeak({
  app,
  env,
  backendToken,
  publicKey,
  secretKey,
  vectorIndexName,
});

(async () => {
  // const smurfsResult = await farspeak
  //   .entity("smurfs")
  //   .write(smurfs);
  // console.log(smurfsResult);
  const smurfsResult = await farspeak.entity("smurfs").getAll();
  console.log(smurfsResult);
})();
