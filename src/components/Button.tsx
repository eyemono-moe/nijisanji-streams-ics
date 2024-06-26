import { type ButtonRootProps, Button as CButton } from "@kobalte/core/button";
import {
	type ComponentProps,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";

type Props = ComponentProps<"button">;

const Button: ParentComponent<Props> = (props) => {
	const merged = mergeProps(props, {
		variant: "primary",
	});
	const [_, originalProps] = splitProps(merged, ["children", "variant"]);

	return (
		<CButton
			{...originalProps}
			class="bg-blue-4 rounded-2 font-bold px-2 py-1 text-white hover:(bg-blue-5) active:(bg-blue-6) transition-color"
		>
			{props.children}
		</CButton>
	);
};

export default Button;
