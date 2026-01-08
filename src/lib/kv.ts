import { KVNamespace } from "@cloudflare/workers-types";

export class KVStorage {
  private kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.kv.get<T>(key, "json");
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const options = ttl ? { expirationTtl: ttl } : undefined;
    await this.kv.put(key, JSON.stringify(value), options);
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key);
  }
}

export const getKV = (env: CloudflareEnv) => new KVStorage(env.KV);