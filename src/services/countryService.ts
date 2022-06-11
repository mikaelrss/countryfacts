import { z } from "zod";
import { Country, CountrySchema } from "../domain/Country";
import fetch from "node-fetch";

const VERSION = "v3.1";
const BASE_URL = `https://restcountries.com/${VERSION}`;

const parseSchema = <Schema extends z.ZodTypeAny>(
  schema: Schema,
  data: any
): z.infer<Schema> => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw Error("Could not parse data from API");
  }
  return parsed.data;
};

export const getCountry = async (name: string): Promise<Country> => {
  const url = `${BASE_URL}/name/${name}`;
  const response = await fetch(url);
  const result = await response.json();
  return parseSchema(CountrySchema, result);
};

export const getAllCountryNames = async (): Promise<Country> => {
  const url = `${BASE_URL}/all`;
  const response = await fetch(url);
  const result = await response.json();
  return parseSchema(CountrySchema, result);
};
