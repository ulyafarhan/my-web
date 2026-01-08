import { getDb } from "../../../../src/lib/db";
import { getKV } from "../../../../src/lib/kv";
import { ProjectService } from "../../../../src/services/project.service";
import { AuthService } from "../../../../src/services/auth.service";
import { projectSchema } from "../../../../src/schemas/project.schema";

export const onRequestPost: PagesFunction<CloudflareEnv> = async (context) => {
  try {
    const req = context.request;
    const authHeader = req.headers.get("Authorization");
    const adminToken = context.env.ADMIN_TOKEN;

    if (!AuthService.isAdmin(authHeader, adminToken as string)) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await req.json();
    const validatedData = projectSchema.parse(body);
    const service = new ProjectService(getDb(context.env), getKV(context.env));
    const id = crypto.randomUUID();
    const success = await service.create(id, validatedData);

    return new Response(JSON.stringify({ success }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return new Response(JSON.stringify({ success: false, error: message }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};