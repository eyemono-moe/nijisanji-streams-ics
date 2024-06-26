import type { Component } from "solid-js";
import { useLivers } from "~/context/liversProvider";
import Button from "./Button";

const ActionButtons: Component = () => {
	const {
		state,
		actions: { selectAll, reset },
	} = useLivers();

	return (
		<div class="flex gap-2 items-center">
			<Button
				onClick={() => {
					selectAll();
				}}
			>
				全員選択
			</Button>
			<Button
				onClick={() => {
					reset();
				}}
			>
				全選択解除
			</Button>
			<div>
				{Object.entries(state.selected).filter((s) => s[1]).length}人選択中
			</div>
		</div>
	);
};

export default ActionButtons;
