import * as v from "valibot";

const attributes = v.pipe(
	v.object({
		title: v.string(),
		description: v.string(),
		url: v.string(),
		start_at: v.pipe(
			v.string(),
			// v.isoDateTime(),
			v.transform((i) => new Date(i)),
		),
		end_at: v.nullish(v.string()),
	}),
	v.transform((i) => {
		const { end_at } = i;
		if (end_at) {
			return Object.assign(i, {
				end_at: new Date(end_at),
			});
		}
		// end_atが無い場合、start_atの一時間後のdateを作る
		const _end_at = new Date(i.start_at.getTime());
		_end_at.setHours(i.start_at.getHours() + 1);
		return Object.assign(i, {
			end_at: _end_at,
		});
	}),
);

const youtubeChannel = v.object({
	data: v.object({
		id: v.string(),
		type: v.literal("youtube_channel"),
	}),
});

const relationships = v.object({
	youtube_channel: youtubeChannel,
});

const data = v.object({
	id: v.string(),
	type: v.literal("youtube_event"),
	attributes,
	relationships,
});

const includedLiver = v.object({
	id: v.string(),
	type: v.literal("liver"),
	attributes: v.object({
		external_id: v.string(),
	}),
	relationships: v.object({
		youtube_channels: v.object({}),
	}),
});
export type IncludedLiver = v.InferOutput<typeof includedLiver>;

const includedChannel = v.object({
	id: v.string(),
	type: v.literal("youtube_channel"),
	attributes: v.object({
		name: v.string(),
		thumbnail_url: v.string(),
		main: v.boolean(),
	}),
	relationships: v.object({
		liver: v.object({
			data: v.object({
				id: v.string(),
				type: v.literal("liver"),
			}),
		}),
		youtube_events: v.object({}),
	}),
});
export type IncludedChannel = v.InferOutput<typeof includedChannel>;

const included = v.variant("type", [includedLiver, includedChannel]);

export const streams = v.object({
	data: v.array(data),
	included: v.array(included),
});

export type Streams = v.InferOutput<typeof streams>;
