import { type RouteDefinition, cache, createAsync } from "@solidjs/router";
import { type Component, For } from "solid-js";
import ActionButtons from "~/components/ActionButtons";
import IcsUrl from "~/components/IcsUrl";
import Liver from "~/components/Liver";
import { getLivers } from "~/lib/getLivers";

const getLiversCache = cache(() => {
	"use server";
	return getLivers();
}, "users");

export const route = {
	load: () => getLiversCache(),
} satisfies RouteDefinition;

const index: Component = () => {
	const livers = createAsync(() => getLiversCache());

	return (
		<main class="prose prose-zinc max-w-unset flex flex-col items-stretch gap-4">
			<div class="sticky top-0 z-1">
				<div class="flex flex-col max-w-1000px px-4 mx-auto bg-white gap-2">
					<div>
						<h1>にじさんじ Streams iCal</h1>
						<p>
							ライバーの配信予定のカレンダーファイル(iCal形式)を生成します。好きなライバーを選択し、以下のURLをお使いのカレンダーアプリにインポートしてください。
						</p>
						<p>
							配信情報は
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.nijisanji.jp/streams"
							>
								にじさんじ公式ライブスケジュール
							</a>
							から取得しています。
						</p>
					</div>
					<IcsUrl />
					<ActionButtons />
				</div>
				<div class="w-full h-4 bg-gradient-from-white bg-gradient-to-transparent bg-gradient-to-b bg-grad" />
			</div>
			<div class="w-full max-w-1000px px-4 mx-auto relative">
				<div class="grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 pb-6">
					<For each={livers()}>{(liver) => <Liver liver={liver} />}</For>
				</div>
			</div>
		</main>
	);
};

export default index;
