import { getDb } from "../../../../../src/lib/db";
import { getKV } from "../../../../../src/lib/kv";
import { ProjectService } from "../../../../../src/services/project.service";
import { AuthService } from "../../../../../src/services/auth.service";
import { projectUpdateSchema } from "../../../../../src/schemas/project.schema";

export const onRequestPut: PagesFunction<CloudflareEnv> = async (context) => {
  try {
    const id = context.params.id as string;
    const req = context.request;
    const authHeader = req.headers.get("Authorization");
    const adminToken = context.env.ADMIN_TOKEN;

    if (!AuthService.isAdmin(authHeader, adminToken)) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { 
        status: 401, 
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await req.json();
    const validatedData = projectUpdateSchema.parse(body);
    const service = new ProjectService(getDb(context.env), getKV(context.env));
    
    const success = await service.update(id, validatedData);

    return new Response(JSON.stringify({ success }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    return new Response(JSON.stringify({ success: false, error: message }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const onRequestDelete: PagesFunction<CloudflareEnv> = async (context) => {
  try {
    const id = context.params.id as string;
    const req = context.request;
    const authHeader = req.headers.get("Authorization");
    const adminToken = context.env.ADMIN_TOKEN;

    if (!AuthService.isAdmin(authHeader, adminToken)) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const service = new ProjectService(getDb(context.env), getKV(context.env));
    const success = await service.delete(id);

    return new Response(JSON.stringify({ success }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Delete failed" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};