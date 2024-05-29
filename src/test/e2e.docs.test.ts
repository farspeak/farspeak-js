import assert from "assert";
import "dotenv/config";
import { Farspeak } from "../../src/farspeak";

const {
  FARSPEAK_APP: app,
  FARSPEAK_ENV: env,
  FARSPEAK_BACKEND_TOKEN: backendToken,
} = process.env;

const farspeak = new Farspeak({ app, env, backendToken });

(async () => {
  type MyEntityType = {
    full_name: string;
    last_positions: string[];
    email: string;
    phone: string;
    skills: string[];
  };
  const filePath = "./src/test/fake-resume.pdf";
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
    .analyseDocument({ filePath, instructions, template });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const entity = await farspeak.entity("cvs").get<MyEntityType>(doc.id);
  assert(doc.id === entity.id);
  assert(doc.email === entity.email);
  assert(doc.phone === entity.phone);
  assert(Array.isArray(doc.skills));
  assert(Array.isArray(doc.last_positions));

  // const inquire = await farspeak
  //   .entity("cvs")
  //   .inquire("Where did John Doe work?");
  // console.log({ inquire });
})();
