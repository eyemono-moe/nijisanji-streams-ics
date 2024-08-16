import type { APIEvent } from "@solidjs/start/server";
import pkg from "lz-string";
import * as v from "valibot";
import { createIcs } from "~/lib/createIcs";
import { useQuery } from "~/lib/useQuery";

const { decompressFromEncodedURIComponent } = pkg;

const schema = v.object({
  livers: v.nullish(v.string()),
});

const liversSchema = v.array(v.string());

export const GET = async (event: APIEvent) => {
  const parsedParams = useQuery(schema, event.nativeEvent);

  let selectedLivers: string[] | undefined = undefined;
  if (parsedParams.livers) {
    selectedLivers = v.parse(
      liversSchema,
      JSON.parse(decompressFromEncodedURIComponent(parsedParams.livers)),
    );
    selectedLivers = selectedLivers.length > 0 ? selectedLivers : undefined;
  }

  const ics = await createIcs(selectedLivers);
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
    },
  });
};
