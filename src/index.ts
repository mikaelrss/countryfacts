import fastify from "fastify";
import { countryRoutes } from "./routes/countries";

const app = fastify({ logger: true });

app.register(countryRoutes, { prefix: "countries" });

(async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
})();
