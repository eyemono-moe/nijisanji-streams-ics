import * as v from "valibot";
import { livers } from "~/schema/livers";

export const getLivers = async () => {
  const getLiver = fetch(
    "https://www.nijisanji.jp/api/livers?limit=999&orderKey=name&affiliation=nijisanji&locale=ja&includeAll=true",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    },
  )
    .then((r) => r.json())
    .then((j) => parseLivers(j));

  const getLiverEn = fetch(
    "https://www.nijisanji.jp/api/livers?limit=999&orderKey=name&affiliation=nijisanjien&locale=ja&includeAll=true",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    },
  )
    .then((r) => r.json())
    .then((j) => parseLivers(j));

  const [livers, liversEn] = await Promise.all([getLiver, getLiverEn]);

  return [...livers, ...liversEn];
};

const parseLivers = (res: unknown) => {
  const { issues, output, success } = v.safeParse(livers, res);
  if (success) return output;
  console.error(issues);
  throw new Error("failed to parse livers");
};
