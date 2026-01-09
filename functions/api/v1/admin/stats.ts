export const onRequest: PagesFunction<{ DB: D1Database }> = async (context) => {
  try {
    const stats = await context.env.DB.batch([
      context.env.DB.prepare("SELECT COUNT(*) as total FROM projects"),
      context.env.DB.prepare("SELECT COUNT(*) as featured FROM projects WHERE is_featured = 1"),
      context.env.DB.prepare("SELECT SUM(view_count) as views FROM project_views"),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalProjects: stats[0].results[0].total,
          featuredProjects: stats[1].results[0].featured,
          totalViews: stats[2].results[0].views || 0,
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};