import _ from "lodash";

// Define a type for the generated ID objects
type UniqueIdObject = { id: string };

// Define a type alias for the function return type
type GenerateUniqueIds = UniqueIdObject[];

/**
 * Generates an array of objects with unique IDs.
 *
 * @param times - The number of unique ID objects to generate.
 * @param label - An optional prefix label for the unique IDs.
 * @returns An array of objects, each containing a unique ID.
 */
export const generateUniqueIds = (
	times: number,
	label: string = "id",
): GenerateUniqueIds => {
	return _.times(times, () => ({ id: _.uniqueId(`${label}_`) }));
};
