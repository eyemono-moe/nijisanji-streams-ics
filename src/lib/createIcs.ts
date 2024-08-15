import * as ics from "ics";
import type { getStreams } from "./getStreams";

export const createIcs = (streams: Awaited<ReturnType<typeof getStreams>>) => {
  const events = convertStreamsToEvents(streams);
  const { value } = ics.createEvents(events, {
    calName: "にじさんじ Live Streams",
  });
  if (!value) throw new Error("failed to create ics events");
  return value;
};

const convertStreamsToEvents = (
  streams: Awaited<ReturnType<typeof getStreams>>,
): ics.EventAttributes[] => {
  return streams.map((s) => {
    return {
      start: dateToDateArray(s.attributes.start_at),
      end: dateToDateArray(s.attributes.end_at),
      title: s.attributes.title,
      uid: s.id,
      // description: s.attributes.description,  // icsライブラリのせいかこれを入れるとめちゃくちゃ遅くなる
      url: s.attributes.url,
      // organizer: {
      // 	name: s.channel.attributes.name,
      // },
    };
  });
};

const dateToDateArray = (date: Date): ics.DateArray => [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
];
