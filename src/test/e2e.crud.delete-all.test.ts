import assert from "assert";
import "dotenv/config";
import { Farspeak } from "../../src/farspeak";
import {
  Milestone,
  Project,
  milestonesPegasus,
  milestonesPhoenix,
  projectPegasus,
  projectPhoenix,
} from "./seed";

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
  assert(entitiesProjectsResult.ids.length === 2);

  let getProjectsResult = await farspeak
    .entity("projects")
    .getAll<Project, "projects">();
  assert(
    getProjectsResult["projects"].at(0)?.id === entitiesProjectsResult.ids[0]
  );
  console.log(getProjectsResult);

  let id1 = getProjectsResult["projects"].at(0)?.id;
  let id2 = getProjectsResult["projects"].at(1)?.id;
  assert(id1);
  assert(id2);

  const milestonesPhoenixResult = await farspeak
    .entity("projects")
    .id(id1)
    .entity("milestones")
    .write(milestonesPhoenix);
  assert(entitiesProjectsResult.ids.length === 2);

  const milestonesPegasusResult = await farspeak
    .entity("projects")
    .id(id2)
    .entity("milestones")
    .write(milestonesPegasus);
  assert(entitiesProjectsResult.ids.length === 2);

  let m1id1 = milestonesPhoenixResult.ids[0];
  let m1id2 = milestonesPhoenixResult.ids[1];
  let m2id1 = milestonesPegasusResult.ids[0];
  let m2id2 = milestonesPegasusResult.ids[1];
  let m2id3 = milestonesPegasusResult.ids[2];
  let m2id4 = milestonesPegasusResult.ids[3];
  assert(m1id1);
  assert(m1id2);
  assert(m2id1);
  assert(m2id2);
  assert(m2id3);
  assert(m2id4);

  let getPhoenixResult = await farspeak
    .entity("projects")
    .id(id1)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  console.log(getPhoenixResult);

  let getPegasusResult = await farspeak
    .entity("projects")
    .id(id2)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  console.log(getPegasusResult);

  let deleteSingleProjectResult = await farspeak.entity("projects").deleteAll();
  console.log(deleteSingleProjectResult);
  assert(deleteSingleProjectResult.deleted === 8);

  getPhoenixResult = await farspeak
    .entity("projects")
    .id(id1)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  getPegasusResult = await farspeak
    .entity("projects")
    .id(id2)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  assert(getPhoenixResult.milestones.length === 0);
  assert(getPegasusResult.milestones.length === 0);
})();
