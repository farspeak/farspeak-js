export type Farspeak_Construct = {
  app: string | undefined;
  env: string | undefined;
  backendToken: string | undefined;
};

export type EntityWithId<T> = T & { id: string };
export type EntityMap<T> = {
  [key: string]: EntityWithId<T>;
};

export type EntityType = {
  [key: string]: any;
};
export type EntitiesMeta = {
  totalCount: number;
  items: number;
  pages: number;
  page: number;
  next?: number;
  previous?: number;
  current_page: string;
  previous_page?: string;
  next_page?: string;
  first_page?: string;
  last_page?: string;
}
export type PaginationMeta = {
  __meta: EntitiesMeta;
}
export type EntityAPIResult = {
  __meta: {
    self: string;
  };
} & { id: string } & {
  [key: string]: EntityWithID;
};
export type EntitiesAPIResult = {
  __meta: EntitiesMeta;
} & {
  [key: string]: EntityAPIResult[];
};

export type EntityWithID = {
  id: string;
} & {
  [key: string]: EntityType;
};
export type EntitiesUpdatePayload = {
  payload: EntityWithID[];
};

export type Entity_Chain = { chain: string[] };
export type Entity_ID = { id: string };
export type Entity_Body = { body: EntityType };
export type Entity_Payload = { payload: EntityType[] };
export type Entity_Chain_Payload = Entity_Chain & Entity_Payload;

export type API_ARGS = {
  app: string;
  env: string;
  backendToken: string;
};

export type Delete_Entity_Result = { deleted: boolean };
export type DeleteEntitiesResult = Promise<{ deleted: number }>;
export type WriteEntitiesResult = Promise<{ ids: string[] }>;
