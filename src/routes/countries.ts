import { FastifyPluginAsync } from "fastify";

export const countryRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", async function (request, reply) {
    return { hello: "world" };
  }),
    fastify.get("/bye", async function (request, reply) {
      return { bye: "good bye" };
    });
};
