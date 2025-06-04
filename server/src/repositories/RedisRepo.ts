import redis from "@/lib/redis";

export default class RedisRepository {
  async createOne(key: string, value: string) {
    return redis.set(key, value);
  }

  async findOne(key: string) {
    return redis.get(key);
  }

  async deleteOne(key: string) {
    return redis.del(key);
  }
}
