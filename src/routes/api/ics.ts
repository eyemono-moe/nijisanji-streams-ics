import type { APIEvent } from "@solidjs/start/server";
import pkg from "lz-string";
import * as v from "valibot";
import { createIcs } from "~/lib/createIcs";
import { getStreams } from "~/lib/getStreams";
import { useQuery } from "~/lib/useQuery";

const { decompressFromEncodedURIComponent } = pkg;

const schema = v.object({
	livers: v.nullish(v.string()),
});

const liversSchema = v.array(v.string());

export const GET = async (event: APIEvent) => {
	const parsedParams = useQuery(schema, event.nativeEvent);

	let livers: string[] | undefined = undefined;
	if (parsedParams.livers) {
		livers = v.parse(
			liversSchema,
			JSON.parse(decompressFromEncodedURIComponent(parsedParams.livers)),
		);
		livers = livers.length > 0 ? livers : undefined;
	}

	const streams = await getStreams({
		livers,
	});
	const ics = createIcs(streams);
	return new Response(ics, {
		headers: {
			"Content-Type": "text/calendar; charset=utf-8",
		},
	});
};
