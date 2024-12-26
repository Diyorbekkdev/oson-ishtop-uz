import { ComponentType } from "react";

/**
 * A Higher-Order Component (HOC) factory function that enhances a component by injecting
 * props derived from a hook function. It merges the original component's props with the
 * hook-provided props, allowing for enhanced functionality or data to be passed down.
 *
 * @template SP - The original props type (or state props) passed to the component.
 * @template HP - The hook props type that is derived from the hook function.
 *
 * @param hook - A hook function that accepts a partial version of the original component's props (SP)
 *               and returns additional props (HP) to be injected into the component.
 * @param Component - The original component that will be wrapped and enhanced by this HOC.
 * @param displayName - An optional string to set the display name of the resulting HOC
 *                      for easier debugging.
 *
 * @returns A new component with the same functionality as the original one but
 *          with additional props injected from the hook function. This new component
 *          also provides access to the original component and the hook function for flexibility.
 */

export const hoc = function <SP, HP>(
	hook: (props: Partial<SP>) => HP,
	Component: ComponentType<HP & SP>,
	displayName?: string,
) {
	Component.displayName = displayName;
	const Result: any = (props: SP) => (
		<Component {...(hook(props) || ({} as any))} {...props} />
	);

	/**
	 * The HOC component.
	 *
	 * It first calls the hook function using the provided props and merges the result
	 * with the original props. The hook function can derive its values based on the
	 * original props, and the resulting props are passed down to the wrapped component.
	 *
	 * This allows the HOC to inject new behavior into the component, like data fetching,
	 * derived state, or custom hooks while keeping the component flexible and reusable.
	 */

	Result.Original = Component;
	Result.hook = hook;

	// Return the HOC, ensuring that it retains the types of both HP and SP.
	// This ensures TypeScript can infer the correct types for the props passed to the HOC.
	return Result as ComponentType<Partial<HP> & Partial<SP>> & {
		Original: ComponentType<HP & SP>;
		hook: typeof hook;
	};
};
