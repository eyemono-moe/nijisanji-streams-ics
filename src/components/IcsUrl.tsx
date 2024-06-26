import { type Component, createEffect } from "solid-js";
import { useLivers } from "~/context/liversProvider";
import { copyToClipboard } from "~/lib/copyToClipboard";

import pkg from "lz-string";
import { isServer } from "solid-js/web";

const { compressToEncodedURIComponent } = pkg;

const IcsUrl: Component = () => {
	const { state } = useLivers();

	const url = () => {
		const selectedLivers = Object.entries(state.selected)
			.filter((e) => e[1])
			.map((e) => e[0]);

		const livers = compressToEncodedURIComponent(
			JSON.stringify(selectedLivers),
		);

		const params = () =>
			new URLSearchParams({
				livers,
			});

		if (isServer) return "http://localhost:3000/api/ics?livers=NoXSA";
		return `${location.protocol}//${location.host}/api/ics?${params()}`;
	};

	return (
		<div class="flex items-center w-full p-2 bg-zinc-100 rounded-2 gap-2">
			<input
				class="truncate w-full ml-2 bg-transparent"
				value={url()}
				readonly
			/>
			<button
				type="button"
				onClick={() => {
					copyToClipboard(url());
				}}
				class="shrink-0 bg-zinc-300 font-bold p-1 rounded"
				title="copy to clipboard"
			>
				<div class="i-material-symbols:content-copy-outline-rounded w-6 h-6" />
			</button>
		</div>
	);
};

export default IcsUrl;
