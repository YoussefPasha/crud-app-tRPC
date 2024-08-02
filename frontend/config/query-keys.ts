const QueryKeys = {
  APARTMENTS: "APARTMENTS",
  APARTMENT: "APARTMENT",
} as const;

export type QueryKeysType = (typeof QueryKeys)[keyof typeof QueryKeys];

export default QueryKeys;
