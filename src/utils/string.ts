import slugify from "slugify";

export function createSlug(text: string | undefined) {
  if (!text) return "";
  return slugify(text, { lower: true, strict: true });
}
