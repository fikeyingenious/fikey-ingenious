const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname === "/api/health") {
      return Response.json(
        {
          ok: true,
          service: "fikey-ingenious",
          assistant: "not-enabled",
        },
        { headers: jsonHeaders },
      );
    }

    return Response.json(
      { error: "API route not found" },
      { status: 404, headers: jsonHeaders },
    );
  },
};
