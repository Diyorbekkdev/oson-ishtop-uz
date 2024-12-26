// Importing types for the Redux store and dispatch from the application.
// AppDispatch is the type for the dispatch function, while RootStore represents the overall shape of the store.
import type { AppDispatch, RootStore } from "@/redux";

// Importing the necessary hooks from 'react-redux' to access the Redux dispatch function and selector.
import {
	type TypedUseSelectorHook, // Type definition for the useSelector hook to ensure the correct store structure.
	useDispatch, // Hook to dispatch actions in Redux.
	useSelector, // Hook to select parts of the Redux state.
} from "react-redux";

/**
 * Custom typed hook for dispatching Redux actions.
 *
 * @returns {AppDispatch} - This hook returns the `dispatch` function typed as `AppDispatch`, which
 * ensures that the dispatch function only accepts properly typed actions.
 *
 * Usage:
 * Instead of using the default `useDispatch` hook provided by `react-redux`,
 * use this custom hook `useReduxDispatch` to ensure that the dispatch function is strongly typed
 * according to the application’s action creators.
 *
 * Benefits:
 * 1. Provides type safety when dispatching actions, preventing the dispatch of invalid actions.
 * 2. Helps with autocompletion in TypeScript-supported IDEs, making the developer experience smoother.
 */
export const useReduxDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom typed hook for selecting state from the Redux store.
 *
 * @type {TypedUseSelectorHook<RootStore>} - A type-safe version of the `useSelector` hook
 * that is tied to the structure of the application’s `RootStore`.
 *
 * Usage:
 * Use `useReduxSelector` in place of the standard `useSelector` to benefit from TypeScript's
 * understanding of the entire store's state shape, allowing for safer and more predictable access
 * to the store's state.
 *
 * Benefits:
 * 1. Enforces type safety when accessing different parts of the Redux store.
 * 2. Prevents runtime errors by ensuring that only valid keys from `RootStore` are selected.
 * 3. Provides better type inference when working with selectors, which improves development efficiency.
 */
export const useReduxSelector: TypedUseSelectorHook<RootStore> = useSelector;
