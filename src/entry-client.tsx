// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: div#root in index.html
mount(() => <StartClient />, document.getElementById("app")!);
