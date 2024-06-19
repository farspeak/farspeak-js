import assert from "assert";
import "dotenv/config";
import { Farspeak } from "../../src/farspeak";
import { projectPegasus, projectPhoenix } from "./seed";

const {
  FARSPEAK_APP: app,
  FARSPEAK_ENV: env,
  FARSPEAK_BACKEND_TOKEN: backendToken,
} = process.env;

const publicKey = "fs-pub-g1k0b693rb4a81dc";
const secretKey = "fs-ok8yn2hqvxc26rlkzscxjtcczug63pcs9ehzu0to6r6dvlei";

const farspeak = new Farspeak({
  app,
  env,
  backendToken,
  publicKey,
  secretKey,
});

type Todo = {
  title: string;
  completed: boolean;
};

const getTodos = async () => {
  const todos = await farspeak.entity("todos").getAll<Todo, "todos">();
  return todos;
};

(async () => {
  const entitiesProjectsResult = await farspeak
    .entity("projects")
    .write([projectPhoenix, projectPegasus]);
  assert(entitiesProjectsResult.ids instanceof Array);
  assert(typeof entitiesProjectsResult.ids[0] === "string");
  assert(typeof entitiesProjectsResult.ids[1] === "string");
  assert(entitiesProjectsResult.ids.length === 2);

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // let getInquiry = await farspeak
  //   .entity("projects")
  //   .inquire("Which project is about core product?");
  // assert(getInquiry.answer);
  // assert(typeof getInquiry.answer === "string");
  // console.log(getInquiry);

  // getInquiry = await farspeak
  //   .entity("projects")
  //   .inquire("Who works in project Pegasus?");
  // assert(getInquiry.answer);
  // assert(typeof getInquiry.answer === "string");
  // console.log(getInquiry);

  // const deleteResult = await farspeak.entity("projects").deleteAll();
  // assert(deleteResult);
  // console.log(deleteResult);
  // assert(deleteResult.deleted === 2);
})();
