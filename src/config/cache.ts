import { RedisOptions } from 'ioredis';

// RedisOptions é uma interface que contem os tipos para o redis
interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    },
  },
  driver: 'redis',
} as ICacheConfig;
