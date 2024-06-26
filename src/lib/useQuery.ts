import * as v from "valibot";
import { type HTTPEvent, getQuery } from "vinxi/http";

export const useQuery = <
	TEntries extends v.ObjectEntries,
	TMessage extends v.ErrorMessage<v.ObjectIssue> | undefined,
>(
	schema: v.ObjectSchema<TEntries, TMessage>,
	event: HTTPEvent,
) => {
	const query = getQuery(event);
	const { issues, output, success } = v.safeParse(schema, query);
	if (success) return output;
	console.error(issues);
	throw new Error(`failed to parse params, input:${query}`);
};
