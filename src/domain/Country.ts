import { z } from "zod";

const CurrencySchema = z.object({
  code: z.string().optional(),
  name: z.string(),
  symbol: z.string().optional(),
});

const LanguageSchema = z.object({
  name: z.string(),
  nativeName: z.string(),
});

const NameSchema = z.object({
  common: z.string(),
  official: z.string(),
});

let _ConuntrySchema = z.object({
  name: z.union([z.string(), NameSchema]),
  topLevelDomain: z.string().array().min(1).optional(),
  capital: z.union([z.string(), z.string().array()]).optional(),
  region: z.string(),
  continent: z.string().optional(),
  population: z.number(),
  latlng: z.tuple([z.number(), z.number()]),
  demonym: z.string().optional(),
  area: z.number(),
  timezones: z.string().array().min(1),
  borders: z.string().array().optional(),
  numericCode: z.string().optional(),
  currencies: z.record(z.string(), CurrencySchema).optional(),
  languages: z.record(z.string(), z.string()).optional(),
  flags: z.object({ png: z.string() }),
  independent: z.boolean().optional(),
  car: z
    .object({
      signs: z.string().array(),
      side: z.union([z.literal("right"), z.literal("left")]),
    })
    .optional(),
});
export const CountrySchema = _ConuntrySchema.array();

export type Country = z.infer<typeof CountrySchema>;
export type Properties = keyof z.infer<typeof _ConuntrySchema>;
