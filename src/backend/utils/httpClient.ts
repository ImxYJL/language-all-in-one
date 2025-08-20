import 'server-only';

import logger from './logger';

async function httpClient(url: string, options?: RequestInit): Promise<Response> {
  const startedAtMs = Date.now();
  const resource = `${options?.method || 'GET'} ${url}`;

  logger.info(`[HTTP] -> ${resource}`);
  const response = await fetch(url, options);
  const elapsed = Date.now() - startedAtMs;

  if (response.ok) {
    logger.info(`[HTTP] <- ${response.status} ${resource} (${elapsed}ms)`);
  } else {
    logger.error(`[HTTP] <- ${response.status} ${resource} (${elapsed}ms)`);
  }

  return response;
}

export default httpClient;
