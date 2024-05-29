import "dotenv/config";
import { dissoc, omit } from "ramda";
import {
  analyseDocument,
  deleteEntities,
  deleteEntity,
  getEntities,
  getEntity,
  getInquiry,
  updateEntities,
  updateEntity,
  writeEntities,
} from "./api";
import { EntityOps } from "./entity-ops";
import { FarspeakError } from "./errors";
import {
  DeleteEntitiesResult,
  EntityType,
  Farspeak_Construct,
  PaginationMeta,
  WriteEntitiesResult,
} from "./types";
import { tryApi } from "./utils";

class Farspeak {
  public app: string = "";
  public env: string = "";
  public backendToken: string = "";
  private chain: string[];
  constructor({ app, env, backendToken }: Farspeak_Construct) {
    if (!app || !env || !backendToken) {
      throw new FarspeakError("One of the dependencies is missing!");
    }
    this.app = app;
    this.env = env;
    this.backendToken = backendToken;
    this.chain = [];
  }
  public addToChain(val: string) {
    this.chain.push(val);
  }
  public resetChain() {
    this.chain = [];
  }
  public async writeEntities(payload: EntityType[]): WriteEntitiesResult {
    const ids = await tryApi(() =>
      writeEntities({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        payload,
        chain: this.chain,
      })
    );
    return ids;
  }
  public entity(name: string) {
    this.chain.push(name);
    const ops = { ...dissoc("entity", EntityOps(this, name)) };
    return ops;
  }
  public async getEntities<T, N extends string>(): Promise<
    { [K in N]: Array<T & { id: string }> } & PaginationMeta
  > {
    const entities = await tryApi(() =>
      getEntities({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        chain: this.chain,
      })
    );
    return entities;
  }
  public async getEntity<T>(id: string): Promise<T & { id: string }> {
    const entities = await tryApi(() =>
      getEntity({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        chain: this.chain,
        id,
      })
    );
    return entities;
  }
  public async updateAll<T>(
    payload: Array<T & { id: string } & Record<string, unknown>>
  ): Promise<Array<T & { id: string } & Record<string, unknown>>> {
    const entities = await updateEntities<T>({
      app: this.app,
      env: this.env,
      backendToken: this.backendToken,
      chain: this.chain,
      payload,
    });
    return entities;
  }
  public async update<T>(
    payload: T & { id: string }
  ): Promise<Array<T & { id: string } & Record<string, unknown>>> {
    const entities = await updateEntity({
      app: this.app,
      env: this.env,
      backendToken: this.backendToken,
      chain: this.chain,
      id: payload.id,
      body: omit(["id"], payload),
    });
    return entities;
  }
  public async inquire(inquiry: string): Promise<{ answer: string }> {
    const entities = await getInquiry({
      app: this.app,
      env: this.env,
      backendToken: this.backendToken,
      chain: this.chain,
      inquiry,
    });
    return entities;
  }
  public async deleteAll(): DeleteEntitiesResult {
    const numberOfDeletedItems = await tryApi(() =>
      deleteEntities({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        chain: this.chain,
      })
    );
    return numberOfDeletedItems;
  }
  public async deleteOne(id: string) {
    const deleted = await tryApi(() =>
      deleteEntity({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        chain: this.chain,
        id,
      })
    );
    return deleted;
  }
  public async analyseDocument({
    file,
    instructions,
    template,
  }: {
    instructions: string;
    template: string;
    file: Buffer;
  }) {
    const doc = await tryApi(() =>
      analyseDocument({
        app: this.app,
        env: this.env,
        backendToken: this.backendToken,
        chain: this.chain,
        instructions,
        template,
        file,
      })
    );
    return doc;
  }
}

export { Farspeak };
