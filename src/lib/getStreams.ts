import * as v from "valibot";
import {
  type IncludedChannel,
  type IncludedLiver,
  type Streams,
  streams,
} from "../schema/streams";
import { range } from "./range";

type GetStreamsFilter = {
  livers?: string[];
};

export const getStreams = async (filter: GetStreamsFilter) => {
  const ps = [];
  for (const i of range(-7, 7)) {
    ps.push(getStream(i));
  }
  const streams = await Promise.all(ps);
  let mergedStreams = mergeStreams(streams);

  if (filter.livers) {
    mergedStreams = mergedStreams.filter((s) =>
      filter.livers?.includes(s.liver.attributes.external_id),
    );
  }

  return mergedStreams;
};

const getStream = async (dayOffset = 0) => {
  const params = new URLSearchParams({
    day_offset: dayOffset.toString(),
  });
  const res = await fetch(`https://www.nijisanji.jp/api/streams?${params}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  }).then((r) => r.json());
  const { output, success, issues } = v.safeParse(streams, res);
  if (success) {
    return output;
  }
  console.error(issues);
  throw new Error("failed to parse streams");
};

const mergeStreams = (streams: Streams[]) => {
  const data = Array.from(
    new Map(streams.flatMap((s) => s.data.map((d) => [d.id, d]))).values(),
  );
  const channelMap = new Map(
    streams.flatMap((s) =>
      s.included
        .filter((i) => i.type === "youtube_channel")
        .map((c) => [c.id, c]),
    ),
  );
  const liverMap = new Map(
    streams.flatMap((s) =>
      s.included.filter((i) => i.type === "liver").map((c) => [c.id, c]),
    ),
  );
  const parsed = data.reduce<
    {
      id: Streams["data"][number]["id"];
      attributes: Streams["data"][number]["attributes"];
      channel: IncludedChannel;
      liver: IncludedLiver;
    }[]
  >((prev, current) => {
    const channelId = current.relationships.youtube_channel.data.id;
    const channel = channelMap.get(channelId);
    if (!channel) throw new Error("channel not found");

    const liverId = channel.relationships.liver.data.id;
    const liver = liverMap.get(liverId);
    if (!liver) throw new Error("liver not found");

    prev.push({
      id: current.id,
      attributes: current.attributes,
      channel,
      liver,
    });
    return prev;
  }, []);

  return parsed;
};
