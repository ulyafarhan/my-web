import { getDb } from "../../../src/lib/db";
import { ProfileRow, Timeline } from "../../../src/types/domain";

export const onRequestGet: PagesFunction<CloudflareEnv> = async (context) => {
  try {
    const db = getDb(context.env);
    const profile = await db.queryOne<ProfileRow>("SELECT * FROM profiles LIMIT 1");
    const timelines = await db.query<Timeline>("SELECT * FROM timelines ORDER BY year DESC");

    const data = {
      profile: profile ? {
        ...profile,
        socials: JSON.parse(profile.socials)
      } : null,
      timelines
    };

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Initialization failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};