import { env } from "@/env";
import { Redis } from "ioredis";

// const redis = new Redis(env.REDIS_URL);
const redis = new Redis("redis://localhost:6379");

export default redis;
