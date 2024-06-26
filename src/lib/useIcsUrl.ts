import pkg from "lz-string";
import { isServer } from "solid-js/web";
import { useLivers } from "~/context/liversProvider";

const { compressToEncodedURIComponent } = pkg;

export const useIcsUrl = () => {
	const { state } = useLivers();

	const selectedLivers = () =>
		Object.entries(state.selected)
			.filter((e) => e[1])
			.map((e) => e[0]);

	const livers = () =>
		compressToEncodedURIComponent(JSON.stringify(selectedLivers()));

	const params = () =>
		new URLSearchParams({
			livers: livers(),
		});

	if (isServer) return () => "http://localhost:3000/api/ics?livers=NoXSA";
	return () => `${location.protocol}//${location.host}/api/ics?${params()}`;
};
