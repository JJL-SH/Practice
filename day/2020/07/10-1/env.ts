import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

console.log(env.APP_HOST);
