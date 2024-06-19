export type Farspeak_Construct = {
  app: string | undefined;
  env: string | undefined;
  backendToken: string | undefined;
  publicKey?: string | undefined;
  secretKey?: string | undefined;
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
export type Entity_Chain = { chain: string[] };
export type Entity_ID = { id: string };
export type Entity_Body = { body: EntityType };
export type Entity_Payload = { payload: EntityType[] };
export type Entity_Chain_Payload = Entity_Chain & Entity_Payload;

export type API_ARGS = {
  app: string;
  env: string;
  backendToken: string;
  publicKey?: string;
  secretKey?: string;
};

export type Analyse_Doc = {
  file: Buffer;
  instructions: string;
  template: string;
};

export type DeleteEntitiesResult = Promise<{ deleted: number }>;
export type WriteEntitiesResult = Promise<{ ids: string[] }>;
