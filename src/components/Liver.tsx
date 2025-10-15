import { type Component, Show } from "solid-js";
import { useLivers } from "~/context/liversProvider";
import { randomColor } from "~/lib/color";
import type { Livers } from "~/schema/livers";

type Props = {
  liver: Livers[number];
};

const Liver: Component<Props> = (props) => {
  const {
    state,
    actions: { setSelect },
  } = useLivers();

  const selected = () => state.selected[props.liver.id] ?? false;
  const toggleSelected = () => {
    setSelect(props.liver.id, !selected());
  };

  return (
    <button
      class="relative flex flex-col items-center gap-2 rounded-4 md:p-4 p-1 hover:(scale-105) transition-transform"
      classList={{
        "outline outline-lime-500": selected(),
      }}
      style={{
        "background-color": randomColor(props.liver.name),
      }}
      onClick={() => {
        toggleSelected();
      }}
      type="button"
    >
      <img
        src={props.liver.images.head.url}
        alt={`${props.liver.name} アイコン`}
        loading="lazy"
        class="w-full aspect-ratio-1 rounded-full drag-none"
        draggable={false}
      />
      <div class="text-center my-auto font-bold">{props.liver.name}</div>
      <Show when={selected()}>
        <div class="absolute w-10 h-10 right--4 top--4">
          <div class="absolute bg-white rounded-full w-full h-full" />
          <div class="absolute i-material-symbols:check-circle-rounded bg-lime-500 w-full h-full" />
        </div>
      </Show>
    </button>
  );
};

export default Liver;
