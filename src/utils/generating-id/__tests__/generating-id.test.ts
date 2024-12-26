import { describe, expect, it } from "vitest";
import { generateUniqueIds } from "..";

describe("generateUniqueIds", () => {
	it("should generate an array of objects with unique IDs", () => {
		const result = generateUniqueIds(3);
		expect(result).toHaveLength(3);
		result.forEach((obj) => {
			expect(obj).toHaveProperty("id");
			expect(typeof obj.id).toBe("string");
			expect(obj.id).toMatch(/^id_\d+$/);
		});
	});

	it("should generate IDs with a custom label", () => {
		const label = "custom";
		const result = generateUniqueIds(2, label);
		expect(result).toHaveLength(2);
		result.forEach((obj) => {
			expect(obj.id).toMatch(new RegExp(`^${label}_\\d+$`));
		});
	});

	it("should generate an empty array when times is 0", () => {
		const result = generateUniqueIds(0);
		expect(result).toHaveLength(0);
	});

	it("should handle non-default label values correctly", () => {
		const label = "test";
		const result = generateUniqueIds(1, label);
		expect(result).toHaveLength(1);
		expect(result[0].id).toMatch(/^test_\d+$/);
	});
});
