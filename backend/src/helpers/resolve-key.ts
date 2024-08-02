import { v4 as uuid } from "uuid";

export function resolveKey(
  key: string | undefined,
  prefix: string | undefined,
  postfix: string | undefined
) {
  if (!key) key = uuid();
  if (prefix) key = prefix + key;
  if (postfix) key = key + postfix;
  return key;
}
