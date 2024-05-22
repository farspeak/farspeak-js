import { dissoc, pick } from "ramda";
import { Farspeak } from "./farspeak";
import { EntityType } from "./types";

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
  };
};
