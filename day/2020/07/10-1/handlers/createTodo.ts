import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { createTodo } from "../services/todos.ts";

export default async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {};
