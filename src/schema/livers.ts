import * as v from "valibot";

const image = v.object({
  url: v.pipe(
    v.string(),
    v.transform((i) => `https://www.nijisanji.jp${i}&w=150&fm=webp`),
  ),
});

const liver = v.object({
  name: v.string(),
  id: v.string(),
  images: v.object({
    head: image,
  }),
  slug: v.string(),
});

export const livers = v.array(liver);

export type Livers = v.InferOutput<typeof livers>;
