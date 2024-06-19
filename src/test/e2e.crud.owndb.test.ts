import assert from "assert";
import "dotenv/config";
import { Farspeak } from "../../src/farspeak";
import {
  smurfs
} from "./seed";

const {
  FARSPEAK_APP: app,
  FARSPEAK_ENV: env,
  FARSPEAK_BACKEND_TOKEN: backendToken,
} = process.env;

const publicKey = "";
const secretKey = "";
const farspeak = new Farspeak({ app, env, backendToken, publicKey, secretKey });

(async () => {
  // const smurfsResult = await farspeak
  //   .entity("smurfs")
  //   .write(smurfs);
  // console.log(smurfsResult);
  const smurfsResult = await farspeak
    .entity("smurfs")
    .getAll();
  console.log(smurfsResult);
})();
