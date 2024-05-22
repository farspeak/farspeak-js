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
  assert(entitiesProjectsResult.ids instanceof Array);
  assert(typeof entitiesProjectsResult.ids[0] === "string");
  assert(typeof entitiesProjectsResult.ids[1] === "string");
  assert(entitiesProjectsResult.ids.length === 2);

  let getProjectsResult = await farspeak
    .entity("projects")
    .getAll<Project, "projects">();
  assert(
    getProjectsResult.projects.at(0)?.id === entitiesProjectsResult.ids[0]
  );
  console.log(getProjectsResult);

  let getPhoenixResult = await farspeak
    .entity("projects")
    .get<Project>(entitiesProjectsResult.ids[0]);
  assert(getPhoenixResult.id === entitiesProjectsResult.ids[0]);
  getPhoenixResult = await farspeak
    .entity("projects")
    .get<Project>(entitiesProjectsResult.ids[1]);
  assert(getPhoenixResult.id === entitiesProjectsResult.ids[1]);

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

  let getPhoenixMilestones = await farspeak
    .entity("projects")
    .id(id1)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  console.log(getPhoenixMilestones);
  assert(getPhoenixMilestones.milestones.at(0)?.id === m1id1);
  assert(getPhoenixMilestones.milestones.at(1)?.id === m1id2);

  let getPegasusMilestones = await farspeak
    .entity("projects")
    .id(id2)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  console.log(getPegasusMilestones);
  assert(getPegasusMilestones.milestones.at(0)?.id === m2id1);
  assert(getPegasusMilestones.milestones.at(1)?.id === m2id2);
  assert(getPegasusMilestones.milestones.at(2)?.id === m2id3);
  assert(getPegasusMilestones.milestones.at(3)?.id === m2id4);

  let deleteSingleProjectResult = await farspeak.entity("projects").delete(id1);
  assert(deleteSingleProjectResult.deleted === true);

  deleteSingleProjectResult = await farspeak.entity("projects").delete(id2);
  assert(deleteSingleProjectResult.deleted === true);

  getPhoenixMilestones = await farspeak
    .entity("projects")
    .id(id1)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  getPegasusMilestones = await farspeak
    .entity("projects")
    .id(id2)
    .entity("milestones")
    .getAll<Milestone, "milestones">();
  assert(getPhoenixMilestones.milestones.length === 0);
  assert(getPegasusMilestones.milestones.length === 0);
})();
