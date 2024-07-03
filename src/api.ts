import axios from "axios";
import {
  Analyse_Doc,
  API_ARGS,
  Entity_Body,
  Entity_Chain,
  Entity_Chain_Payload,
  Entity_ID,
  EntityType,
} from "./types";

const API_BASE = process.env.FARSPEAK_URI || "https://api.farspeak.ai";

export const writeEntities = async (props: API_ARGS & Entity_Chain_Payload) => {
  const { app, env, backendToken, publicKey, secretKey, chain, payload } =
    props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "post",
    url,
    data: [...payload],
    headers,
  });
  const ids = request.data;
  return ids;
};

export const getEntities = async (props: API_ARGS & Entity_Chain) => {
  const { app, env, backendToken, publicKey, secretKey, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "get",
    url,
    headers,
  });
  const entities = request.data;
  return entities;
};

export const getEntity = async (props: API_ARGS & Entity_Chain & Entity_ID) => {
  const { app, env, backendToken, publicKey, secretKey, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}/${props.id}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "get",
    url,
    headers,
  });
  const entity: EntityType = request.data;
  return entity;
};

export const getInquiry = async (
  props: API_ARGS & { inquiry: string } & Entity_Chain
): Promise<{ answer: string }> => {
  const { app, env, backendToken, publicKey, secretKey, vectorIndexName } =
    props;
  const url = `${API_BASE}/knowledgebase/${app}/${env}/${props.chain.join(
    "/"
  )}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  if (vectorIndexName) {
    headers = Object.assign({}, headers, {
      "X-Vector-Index-Name": vectorIndexName,
    });
  }
  const request = await axios({
    method: "post",
    url,
    data: {
      query: props.inquiry,
    },
    headers,
  });
  const answer = request.data;
  return answer;
};

// export const search = async (
//   props: API_ARGS & { query: string }
// ): Promise<any> => {
//   const { app, env, backendToken } = props;
//   const url = `${API_BASE}/search/${app}/${env}`;
//   const request = await axios({
//     method: "post",
//     url,
//     data: {
//       query: props.query,
//     },
//     headers: {
//       token: backendToken,
//     },
//   });
//   const answer = request.data;
//   return answer;
// };

export const deleteEntities = async (props: API_ARGS & Entity_Chain) => {
  const { app, env, backendToken, publicKey, secretKey, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "delete",
    url,
    headers,
  });
  const numberOfDeletedItems = request.data;
  return numberOfDeletedItems;
};

export const deleteEntity = async (
  props: API_ARGS & Entity_Chain & Entity_ID
) => {
  const { app, env, backendToken, publicKey, secretKey, chain, id } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}/${id}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "delete",
    url,
    headers,
  });
  const numberOfDeletedItems = request.data;
  return numberOfDeletedItems;
};

export const updateEntity = async (
  props: API_ARGS & Entity_Chain & Entity_ID & Entity_Body
) => {
  const { app, env, backendToken, publicKey, secretKey, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "patch",
    url,
    data: [Object.assign({}, { id: props.id }, { ...props.body })],
    headers,
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
  const { app, env, backendToken, publicKey, secretKey, chain } = props;
  const url = `${API_BASE}/apps/${app}/${env}/${chain.join("/")}`;
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios({
    method: "patch",
    url,
    data: props.payload,
    headers,
  });
  const ids = request.data;
  return ids;
};

export const fromDocument = async (
  props: API_ARGS & Entity_Chain & Analyse_Doc
) => {
  const { app, env, chain, backendToken, publicKey, secretKey, fileName } =
    props;
  const url = `${API_BASE}/docs/${app}/${env}/${chain[0]}`;
  const formData = new FormData();
  formData.append("docs", new Blob([props.file]), fileName);
  formData.append("instructions", props.instructions);
  formData.append("template", props.template);
  let headers = {
    token: backendToken,
  };
  if (publicKey && secretKey) {
    headers = Object.assign({}, headers, {
      "X-Public-Key": publicKey,
      "X-Secret-Key": secretKey,
    });
  }
  const request = await axios.post(url, formData, {
    headers,
  });
  const res = request.data as { ids: string[] };
  let yay = false;
  let getentity = null;
  if (res.ids[0]) {
    while (!yay) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      getentity = await getEntity({
        app,
        env,
        backendToken,
        publicKey,
        secretKey,
        chain,
        id: res.ids[0],
      });
      yay = getentity.__jobstatus !== "processing";
    }
  }
  return getentity;
};
