import { FastifyPluginAsync } from "fastify";
import { getAllCountryNames, getCountry } from "../services/countryService";

type CountryParam = { Params: { name: string } };

export const countryRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", async function (request, reply) {
    const countries = await getAllCountryNames();
    return { data: countries };
  }),
    fastify.get<CountryParam>("/:name", async function (request, reply) {
      const country = await getCountry(request.params.name);
      return { data: country };
    });
};
