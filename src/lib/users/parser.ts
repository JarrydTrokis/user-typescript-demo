import { User } from "./types";

export const parseUser = (data: unknown): data is User[] => {
  if (!data) return false;
  if (!Array.isArray(data)) return false;

  const match = data.every((e) => {
    if ("id" in e && "name" in e && "email" in e && "picture" in e) return true;
    return false;
  });

  if (!match) return false;
  return true;
};
