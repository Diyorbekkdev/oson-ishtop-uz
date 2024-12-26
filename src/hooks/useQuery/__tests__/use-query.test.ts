import { useQueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { Mock, describe, expect, it, vi } from "vitest";
import { useAppQuery } from "..";

vi.mock("@tanstack/react-query", () => ({
	useQueryClient: vi.fn(),
}));

describe("useAppQuery", () => {
	it("should return query keys that include the specified string", () => {
		// Create a mock query client
		const mockQueryClient = {
			getQueryCache: () => ({
				getAll: () => [
					{ queryKey: ["user", "123"] },
					{ queryKey: ["post", "456"] },
					{ queryKey: ["user", "789"] },
				],
			}),
		};

		// Mock useQueryClient to return the mock query client
		(useQueryClient as Mock).mockReturnValue(mockQueryClient);

		const { result } = renderHook(() => useAppQuery());

		// Test getCacheKeys with a string that should match some query keys
		const cacheKeys = result.current.getCacheKeys("user");

		expect(cacheKeys).toEqual([
			["user", "123"],
			["user", "789"],
		]);
	});

	it("should return an empty array if no query keys match", () => {
		const mockQueryClient = {
			getQueryCache: () => ({
				getAll: () => [{ queryKey: ["post", "456"] }],
			}),
		};

		(useQueryClient as Mock).mockReturnValue(mockQueryClient);

		const { result } = renderHook(() => useAppQuery());

		const cacheKeys = result.current.getCacheKeys("user");

		expect(cacheKeys).toEqual([]);
	});
});
