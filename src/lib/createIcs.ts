import * as ics from "ics";
import { getLivers } from "./getLivers";
import { getStreams } from "./getStreams";

export const createIcs = async (selectedLivers: string[] = []) => {
  const [livers, streams] = await Promise.all([
    getLivers(),
    getStreams({
      livers: selectedLivers,
    }),
  ]);

  const liversMap = new Map(livers.map((l) => [l.id, l]));

  const convertStreamsToEvents = (
    streams: Awaited<ReturnType<typeof getStreams>>,
  ): ics.EventAttributes[] => {
    return streams.map((s) => {
      const livers = [liversMap.get(s.liver.attributes.external_id)]
        .concat(
          s.collaborationLivers.map((l) =>
            liversMap.get(l.attributes.external_id),
          ),
        )
        .filter((l): l is Exclude<typeof l, undefined> => l !== undefined)
        .map((l) => l.name)
        .join(", ");

      return {
        start: dateToDateArray(s.attributes.start_at),
        end: dateToDateArray(s.attributes.end_at),
        title: s.attributes.title,
        uid: s.id,
        description: `by ${livers}, at {s.attributes.url}`,
        url: s.attributes.url,
        // organizer: {
        // 	name: s.channel.attributes.name,
        // },
      };
    });
  };

  const events = convertStreamsToEvents(streams);
  const { value } = ics.createEvents(events, {
    productId: "-//eyemono.moe//NONSGML nijsanji-ics//JA",
    calName: "にじさんじ Live Streams",
  });
  if (!value) throw new Error("failed to create ics events");
  return value;
};

const dateToDateArray = (date: Date): ics.DateArray => [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
];
