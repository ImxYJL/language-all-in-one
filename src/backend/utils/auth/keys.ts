import 'server-only';

import { importJWK, type JWK } from 'jose';
import { serverEnv } from '@/validators/env';
import { isJwk } from '../typeGuard';

export const ALG = 'ES256' as const;

const parsed = JSON.parse(serverEnv.SIGNING_PRIVATE_JWK);
if (!isJwk(parsed)) throw new Error('Invalid SIGNING_PRIVATE_JWK');

const privJwk: JWK = parsed;
export const kid = privJwk.kid;

export const signKeyPromise = importJWK(privJwk, ALG);

const { kty, crv, x, y } = privJwk;
const pubJwk: JWK = { kty, crv, x, y, alg: ALG, use: 'sig', kid };
export const verifyKeyPromise = importJWK(pubJwk, ALG);
