import { z } from "zod";

const normalize = (value) => (typeof value === "string" && value.trim() === "" ? undefined : value);
const strict = process.env.STRICT_ENV === "1";

const schema = z.object({
  GOOGLE_MAPS_API_KEY: strict ? z.string().min(10) : z.string().min(10).optional(),
  PUBLIC_GA_ID: z.string().optional(),
  PUBLIC_GOOGLE_MEASUREMENT_ID: z.string().optional(),
});

const env = {
  GOOGLE_MAPS_API_KEY: normalize(process.env.GOOGLE_MAPS_API_KEY),
  PUBLIC_GA_ID: normalize(process.env.PUBLIC_GA_ID),
  PUBLIC_GOOGLE_MEASUREMENT_ID: normalize(process.env.PUBLIC_GOOGLE_MEASUREMENT_ID),
};

const result = schema.safeParse(env);
if (!result.success) {
  console.error("Invalid environment configuration:");
  for (const issue of result.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

if (env.PUBLIC_GA_ID && env.PUBLIC_GOOGLE_MEASUREMENT_ID) {
  console.warn(
    "Both PUBLIC_GA_ID and PUBLIC_GOOGLE_MEASUREMENT_ID are set. Prefer a single GA identifier."
  );
}
