import { createClient, type SanityClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = !!projectId && /^[a-z0-9-]+$/.test(projectId);

let _client: SanityClient | null = null;
let _writeClient: SanityClient | null = null;

export const client: SanityClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    if (!_client) {
      _client = createClient({
        projectId: isSanityConfigured ? projectId! : 'x',
        dataset,
        apiVersion,
        useCdn: process.env.NODE_ENV === 'production',
      });
    }
    const val = (_client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === 'function') {
      return (...args: unknown[]) => {
        if (!isSanityConfigured) return Promise.resolve(null);
        return (val as (...a: unknown[]) => unknown).apply(_client, args);
      };
    }
    return val;
  },
});

export const writeClient: SanityClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    if (!_writeClient) {
      _writeClient = createClient({
        projectId: isSanityConfigured ? projectId! : 'x',
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
      });
    }
    const val = (_writeClient as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === 'function') {
      return (...args: unknown[]) => {
        if (!isSanityConfigured) return Promise.resolve(null);
        return (val as (...a: unknown[]) => unknown).apply(_writeClient, args);
      };
    }
    return val;
  },
});
