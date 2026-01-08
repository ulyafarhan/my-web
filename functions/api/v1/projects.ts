import { getDb } from "../../../src/lib/db";
import { getKV } from "../../../src/lib/kv";
import { ProjectService } from "../../../src/services/project.service";

export const onRequestGet: PagesFunction<CloudflareEnv> = async (context) => {
  try {
    const service = new ProjectService(getDb(context.env), getKV(context.env));
    const projects = await service.getAll();

    return new Response(JSON.stringify({ success: true, data: projects }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};