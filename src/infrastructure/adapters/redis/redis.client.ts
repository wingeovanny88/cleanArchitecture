import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

import { redisConfig } from '../../config/redis.config';
import { customLogger } from '../../../commons/logger';

@Injectable()
export class RedisClient implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  constructor() {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
    });
  }

  async onModuleInit(): Promise<void> {
    customLogger.log('Redis client inicializado');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
    customLogger.log('Redis client desconectado');
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      customLogger.log(`GET key: ${key} -> ${value}`);
      return value;
    } catch (error) {
      customLogger.error(`Error al obtener key ${key}`, error);
      throw error;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<'OK'> {
    try {
      if (ttl) {
        customLogger.log(`SET key: ${key} con TTL: ${ttl}`);
        return await this.client.set(key, value, 'EX', ttl);
      }
      customLogger.log(`SET key: ${key}`);
      return await this.client.set(key, value);
    } catch (error) {
      customLogger.error(`Error al establecer key ${key}`, error);
      throw error;
    }
  }

  async del(key: string): Promise<number> {
    try {
      customLogger.log(`DELETE key: ${key}`);
      return await this.client.del(key);
    } catch (error) {
      customLogger.error(`Error al eliminar key ${key}`, error);
      throw error;
    }
  }
}
