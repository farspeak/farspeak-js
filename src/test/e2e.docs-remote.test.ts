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

const url = "http://api.farspeak.ai/fake-resume.pdf";

(async () => {
  const instructions = "This is a CV document";
  const template = {
    full_name: "This is full name of the candidate",
    last_positions: `Company names dates and positions as array of items, for example ["ABC Inc, CEO, 2020-2021", "DEF Inc, CTO, 2018-2020"]`,
    email: "This is email of the candidate",
    phone: "This is phone of the candidate",
    skills: `Skills as array of items, for example ["JavaScript, 5 years", "React, strong, 3 years", "Java, intermediate"]`,
  };
  const doc = await farspeak
    .entity("cvs")
    .fromRemoteDocument({ url, instructions, template });
  console.log({ doc });
})();
