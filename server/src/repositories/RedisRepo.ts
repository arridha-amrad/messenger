import redis from "@/lib/redis";

export default class RedisRepository {
  async createOne<T extends object>(key: string, value: T, maxAge?: number) {
    return redis
      .multi()
      .hset(key, value)
      .expire(key, maxAge ?? 86400)
      .exec();
  }

  async findOne(key: string) {
    return redis.get(key);
  }

  async deleteOne(key: string) {
    return redis.del(key);
  }
}
