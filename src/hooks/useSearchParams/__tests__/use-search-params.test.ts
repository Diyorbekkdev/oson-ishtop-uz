// useSearchParams.test.tsx
import { act, renderHook } from "@testing-library/react";
import {
	useLocation,
	useSearchParams as useRouterSearchParams,
} from "react-router-dom";
import { Mock, describe, expect, it, vi } from "vitest";
import { useSearchParams } from "..";

vi.mock("react-router-dom", () => ({
	useLocation: vi.fn(),
	useSearchParams: vi.fn(),
}));

describe("useSearchParams", () => {
	it("should return all query params correctly", () => {
		const mockSearchParams = new URLSearchParams("key1=value1&key2=value2");
		const mockSet = vi.fn();
		(useLocation as Mock).mockReturnValue({
			search: mockSearchParams.toString(),
		});
		(useRouterSearchParams as Mock).mockReturnValue([
			mockSearchParams,
			mockSet,
		]);

		const { result } = renderHook(() => useSearchParams());

		const { keys, values, pair } = result.current.getAllParams();

		expect(keys).toEqual(["key1", "key2"]);
		expect(values).toEqual(["value1", "value2"]);
		expect(pair).toEqual({ key1: "value1", key2: "value2" });
	});

	it("should remove params by key correctly", () => {
		const mockSearchParams = new URLSearchParams("key1=value1&key2=value2");
		const mockSet = vi.fn();
		(useLocation as Mock).mockReturnValue({
			search: mockSearchParams.toString(),
		});
		(useRouterSearchParams as Mock).mockReturnValue([
			mockSearchParams,
			mockSet,
		]);

		const { result } = renderHook(() => useSearchParams());

		act(() => {
			result.current.removeParamsByKey({ keys: ["key1"] });
		});

		const expectedParams = { key2: "value2" };
		expect(mockSet).toHaveBeenCalledWith(expectedParams);
	});

	it("should set new params correctly", () => {
		const mockSearchParams = new URLSearchParams("key1=value1");
		const mockSet = vi.fn();
		(useLocation as Mock).mockReturnValue({
			search: mockSearchParams.toString(),
		});
		(useRouterSearchParams as Mock).mockReturnValue([
			mockSearchParams,
			mockSet,
		]);

		const { result } = renderHook(() => useSearchParams());

		act(() => {
			result.current.setParams({ key2: "value2" });
		});

		const expectedParams = { key1: "value1", key2: "value2" };
		expect(mockSet).toHaveBeenCalledWith(expectedParams);
	});

	it("should clear all params correctly", () => {
		const mockSearchParams = new URLSearchParams("key1=value1");
		const mockSet = vi.fn();
		(useLocation as Mock).mockReturnValue({
			search: mockSearchParams.toString(),
		});
		(useRouterSearchParams as Mock).mockReturnValue([
			mockSearchParams,
			mockSet,
		]);

		const { result } = renderHook(() => useSearchParams());

		act(() => {
			result.current.clearParams();
		});

		const expectedParams = {};
		expect(mockSet).toHaveBeenCalledWith(expectedParams);
	});

	it("should get a specific param correctly", () => {
		const mockSearchParams = new URLSearchParams("key1=value1");
		const mockSet = vi.fn();
		(useLocation as Mock).mockReturnValue({
			search: mockSearchParams.toString(),
		});
		(useRouterSearchParams as Mock).mockReturnValue([
			mockSearchParams,
			mockSet,
		]);

		const { result } = renderHook(() => useSearchParams());

		const value = result.current.getParams("key1");

		expect(value).toBe("value1");
	});
});
