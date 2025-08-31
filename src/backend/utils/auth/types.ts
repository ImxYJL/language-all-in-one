export type ParsedAuthUser = {
  id: string;
  isValid: true;
  isRealUser: boolean;
  isMockUser: boolean;
  payload: import('jose').JWTPayload;
};

export type AuthPayload = { id: string; [k: string]: unknown };
