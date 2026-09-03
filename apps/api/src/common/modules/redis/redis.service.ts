import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly client: RedisClientType) {}

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<'OK' | null> {
    if (ttl) {
      return await this.client.setEx(key, ttl, value);
    }
    return await this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }

  async exists(key: string): Promise<number> {
    return await this.client.exists(key);
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    return (await this.client.expire(key, seconds)) === 1;
  }

  async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  async decr(key: string): Promise<number> {
    return await this.client.decr(key);
  }

  async hGet(key: string, field: string): Promise<string | undefined> {
    return await this.client.hGet(key, field);
  }

  async hSet(key: string, field: string, value: string): Promise<number> {
    return await this.client.hSet(key, field, value);
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    return await this.client.hGetAll(key);
  }

  async hDel(key: string, field: string): Promise<number> {
    return await this.client.hDel(key, field);
  }

  async lPush(key: string, ...values: string[]): Promise<number> {
    return await this.client.lPush(key, values);
  }

  async rPop(key: string): Promise<string | null> {
    return await this.client.rPop(key);
  }

  async lRange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.client.lRange(key, start, stop);
  }

  async sAdd(key: string, ...members: string[]): Promise<number> {
    return await this.client.sAdd(key, members);
  }

  async sMembers(key: string): Promise<string[]> {
    return await this.client.sMembers(key);
  }

  async sIsMember(key: string, member: string): Promise<boolean> {
    return await this.client.sIsMember(key, member);
  }

  async sRem(key: string, ...members: string[]): Promise<number> {
    return await this.client.sRem(key, members);
  }

  async flushDb(): Promise<'OK'> {
    return await this.client.flushDb();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}
