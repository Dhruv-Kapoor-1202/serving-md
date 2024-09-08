import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").get("/", async (c) => {
  return c.render("hello");
});

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
