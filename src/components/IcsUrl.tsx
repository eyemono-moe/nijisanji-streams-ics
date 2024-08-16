import type { Component } from "solid-js";
import { copyToClipboard } from "~/lib/copyToClipboard";
import { useIcsUrl } from "~/lib/useIcsUrl";

const IcsUrl: Component = () => {
  const icsUrl = useIcsUrl();

  return (
    <div class="flex items-center w-full p-2 bg-zinc-100 rounded-2 gap-2">
      <input
        class="truncate w-full ml-2 bg-transparent"
        value={icsUrl()}
        readonly
      />
      <button
        type="button"
        onClick={() => {
          copyToClipboard(icsUrl());
        }}
        class="shrink-0 font-bold p-1 rounded bg-zinc-3 hover:(bg-zinc-4) active:(bg-zinc-5) transition-color"
        title="copy to clipboard"
      >
        <div class="i-material-symbols:content-copy-outline-rounded w-6 h-6" />
      </button>
    </div>
  );
};

export default IcsUrl;
