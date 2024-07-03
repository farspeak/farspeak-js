import { readdir } from "fs/promises";
import { join, relative } from "path";
import { isEmpty } from "ramda";
import { FARSPEAK_ERROR, FarspeakError } from "./errors";
import { EntityType } from "./types";

export const withChainAndPayload = (
  chain: string[],
  payload: EntityType[],
  cb: Function
) => {
  if (chain.length < 1) {
    throw new FarspeakError(FARSPEAK_ERROR.no_direct_chain);
  }
  if (!payload || !Array.isArray(payload)) {
    throw new FarspeakError(FARSPEAK_ERROR.invalid_payload);
  }
  return cb();
};

export const withChain = <T>(chain: string[], cb: Function): T => {
  if (chain.length < 1) {
    throw new FarspeakError(FARSPEAK_ERROR.no_direct_chain);
  }
  return cb();
};

export const withChainAndId = <T>(
  id: string,
  chain: string[],
  cb: Function
): T => {
  if (chain.length < 1) {
    throw new FarspeakError(FARSPEAK_ERROR.no_direct_chain);
  }
  if (!id) {
    throw new FarspeakError(FARSPEAK_ERROR.must_have_id);
  }
  return cb();
};

export const withChainIdAndBody = (
  id: string,
  payload: EntityType,
  chain: string[],
  cb: Function
) => {
  if (chain.length < 1) {
    throw new FarspeakError(FARSPEAK_ERROR.no_direct_chain);
  }
  if (!id) {
    throw new FarspeakError(FARSPEAK_ERROR.must_have_id);
  }
  if (!payload) {
    throw new FarspeakError(FARSPEAK_ERROR.must_have_body);
  }
  return cb();
};

export const withChainAndInquiry = (
  chain: string[],
  inquiry: string,
  cb: Function
) => {
  if (chain.length < 1) {
    throw new FarspeakError(FARSPEAK_ERROR.no_direct_chain);
  }
  if (!inquiry || isEmpty(inquiry)) {
    throw new FarspeakError(FARSPEAK_ERROR.no_inquiry);
  }
  return cb();
};

export const tryApi = async (cb: () => Promise<any>) => {
  try {
    const result = await cb();
    return result;
  } catch (e: any) {
    if (e.response) {
      return { message: e.response.data };
    } else {
      console.error(e);
      throw new FarspeakError("Unknown request error");
    }
  }
};

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const getFiles = async (directory: string) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => !entry.isDirectory())
    .map((entry) => entry.name);
};

export const getFilesRecursive = async (
  baseDirectory: string,
  currentDirectory: string = baseDirectory
): Promise<string[]> => {
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(currentDirectory, entry.name);
      const relativePath = relative(baseDirectory, fullPath);
      if (entry.isDirectory()) {
        return getFilesRecursive(baseDirectory, fullPath);
      }
      return relativePath;
    })
  );
  return files.flat();
};
