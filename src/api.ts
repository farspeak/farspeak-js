import axios from "axios";
import {
  API_ARGS,
  Entity_Body,
  Entity_Chain,
  Entity_Chain_Payload,
  Entity_ID,
  EntityType,
} from "./types";

const API_BASE = process.env.FARSPEAK_URI || "https://api.farspeak.ai";

export const writeEntities = async (props: API_ARGS & Entity_Chain_Payload) => {
  const { app, env, backendToken, chain, payload } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  const request = await axios({
    method: "post",
    url,
    data: [...payload],
    headers: {
      token: backendToken,
    },
  });
  const ids = request.data;
  return ids;
};

export const getEntities = async (props: API_ARGS & Entity_Chain) => {
  const { app, env, backendToken, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  const request = await axios({
    method: "get",
    url,
    headers: {
      token: backendToken,
    },
  });
  const entities = request.data;
  return entities;
};

export const getEntity = async (props: API_ARGS & Entity_Chain & Entity_ID) => {
  const { app, env, backendToken, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}/${props.id}`;
  const request = await axios({
    method: "get",
    url,
    headers: {
      token: backendToken,
    },
  });
  const entity: EntityType = request.data;
  return entity;
};

export const getInquiry = async (
  props: API_ARGS & { inquiry: string } & Entity_Chain
): Promise<{ answer: string }> => {
  const { app, env, backendToken } = props;
  const url = `${API_BASE}/knowledgebase/${app}/${env}/${props.chain.join(
    "/"
  )}`;
  console.log(url);
  const request = await axios({
    method: "post",
    url,
    data: {
      query: props.inquiry,
    },
    headers: {
      token: backendToken,
    },
  });
  const answer = request.data;
  return answer;
};

export const search = async (
  props: API_ARGS & { query: string }
): Promise<any> => {
  const { app, env, backendToken } = props;
  const url = `${API_BASE}/search/${app}/${env}`;
  const request = await axios({
    method: "post",
    url,
    data: {
      query: props.query,
    },
    headers: {
      token: backendToken,
    },
  });
  const answer = request.data;
  console.log(answer);
  return answer;
};

export const deleteEntities = async (props: API_ARGS & Entity_Chain) => {
  const { app, env, backendToken, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  const request = await axios({
    method: "delete",
    url,
    headers: {
      token: backendToken,
    },
  });
  const numberOfDeletedItems = request.data;
  return numberOfDeletedItems;
};

export const deleteEntity = async (
  props: API_ARGS & Entity_Chain & Entity_ID
) => {
  const { app, env, backendToken, chain, id } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}/${id}`;
  const request = await axios({
    method: "delete",
    url,
    headers: {
      token: backendToken,
    },
  });
  const numberOfDeletedItems = request.data;
  return numberOfDeletedItems;
};

export const updateEntity = async (
  props: API_ARGS & Entity_Chain & Entity_ID & Entity_Body
) => {
  const { app, env, backendToken, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  const request = await axios({
    method: "patch",
    url,
    data: [Object.assign({}, { id: props.id }, { ...props.body })],
    headers: {
      token: backendToken,
    },
  });
  const ids = request.data;
  return ids;
};

export const updateEntities = async <T>(
  props: API_ARGS &
    Entity_Chain & {
      payload: Array<T & { id: string } & Record<string, unknown>>;
    }
) => {
  const { app, env, backendToken, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  const request = await axios({
    method: "patch",
    url,
    data: props.payload,
    headers: {
      token: backendToken,
    },
  });
  const ids = request.data;
  return ids;
};