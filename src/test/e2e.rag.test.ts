import assert from "assert";
import "dotenv/config";
import { Farspeak } from "../../src/farspeak";
import { projectPegasus, projectPhoenix } from "./seed";

const {
  FARSPEAK_APP: app,
  FARSPEAK_ENV: env,
  FARSPEAK_BACKEND_TOKEN: backendToken,
} = process.env;

const farspeak = new Farspeak({ app, env, backendToken });

(async () => {
  const entitiesProjectsResult = await farspeak
    .entity("projects")
    .write([projectPhoenix, projectPegasus]);
  assert(entitiesProjectsResult.ids instanceof Array);
  assert(typeof entitiesProjectsResult.ids[0] === "string");
  assert(typeof entitiesProjectsResult.ids[1] === "string");
  assert(entitiesProjectsResult.ids.length === 2);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  let getInquiry = await farspeak
    .entity("projects")
    .inquire("Which project is about core product?");
  assert(getInquiry.answer);
  assert(typeof getInquiry.answer === "string");
  console.log(getInquiry);

  getInquiry = await farspeak
    .entity("projects")
    .inquire("Who works in project Pegasus?");
  assert(getInquiry.answer);
  assert(typeof getInquiry.answer === "string");
  console.log(getInquiry);

  const deleteResult = await farspeak.entity("projects").deleteAll();
  assert(deleteResult);
  console.log(deleteResult);
  assert(deleteResult.deleted === 2);
})();
