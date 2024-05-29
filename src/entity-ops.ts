import { readFile } from "fs/promises";
import { dissoc, pick } from "ramda";
import { FarspeakError } from "./errors";
import { Farspeak } from "./farspeak";
import { EntityType, Entity_ID } from "./types";
import { checkPdf } from "./utils";

export const EntityOps = (farspeak: Farspeak, name: string) => {
  return {
    entity: (name: string) => {
      farspeak.addToChain(name);
      return dissoc("entity", EntityOps(farspeak, name));
    },
    id: (id: string) => {
      farspeak.addToChain(id);
      return pick(["entity"], EntityOps(farspeak, name));
    },
    getAll: async <T, N extends string>() => {
      const entities = await farspeak.getEntities<T, N>();
      farspeak.resetChain();
      return entities;
    },
    get: async <T>(id: string) => {
      const entities = await farspeak.getEntity<T>(id);
      farspeak.resetChain();
      return entities;
    },
    write: async (entities: EntityType[]) => {
      const result = await farspeak.writeEntities(entities);
      farspeak.resetChain();
      return result;
    },
    deleteAll: async () => {
      const result = await farspeak.deleteAll();
      farspeak.resetChain();
      return result;
    },
    delete: async (id: string) => {
      const result = await farspeak.deleteOne(id);
      farspeak.resetChain();
      return result;
    },
    updateAll: async <T>(
      entities: Array<Partial<T> & { id: string } & Record<string, unknown>>
    ) => {
      const result = await farspeak.updateAll<Partial<T>>(entities);
      farspeak.resetChain();
      return result;
    },
    update: async <T>(
      entity: Partial<T> & { id: string } & Record<string, unknown>
    ) => {
      const result = await farspeak.update<Partial<T>>(entity);
      farspeak.resetChain();
      return result[0];
    },
    inquire: async (inquiry: string) => {
      const result = await farspeak.inquire(inquiry);
      farspeak.resetChain();
      return result;
    },
    analyseDocument: async ({
      filePath,
      instructions,
      template,
    }: {
      filePath: string;
      instructions: string;
      template: Record<string, string>;
    }): Promise<Entity_ID & EntityType> => {
      if (!template || typeof template !== "object")
        throw new FarspeakError("Template is required");
      try {
        const isPdf = checkPdf(filePath);
        if (!isPdf) {
          throw new FarspeakError("File is not a PDF");
        }
        const fileStream = await readFile(filePath);
        const oneMBInMebi = 1 << 20;
        if (fileStream.byteLength > oneMBInMebi) {
          throw new FarspeakError("File size is too large");
        }
        const doc = await farspeak.analyseDocument({
          file: fileStream,
          instructions,
          template: JSON.stringify(template),
        });
        farspeak.resetChain();
        return doc;
      } catch (e: any) {
        throw new FarspeakError(e.message);
      }
    },
  };
};
