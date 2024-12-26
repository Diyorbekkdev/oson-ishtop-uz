import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { useBrowserStorage } from "..";

// Mock browser storage APIs
beforeEach(() => {
	globalThis.localStorage = {
		setItem: vi.fn(),
		getItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn(),
	} as unknown as Storage;

	globalThis.sessionStorage = {
		setItem: vi.fn(),
		getItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn(),
	} as unknown as Storage;

	vi.mock("js-cookie", () => ({
		set: vi.fn(),
		get: vi.fn(),
		remove: vi.fn(),
		getAll: vi.fn(),
	}));
});

describe("useBrowserStorage", () => {
	it("should set and get values in localStorage", () => {
		const { local } = useBrowserStorage();
		local.set({ key: "value" });

		expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
			"key",
			JSON.stringify("value"),
		);
		(globalThis.localStorage.getItem as Mock).mockReturnValue(
			JSON.stringify("value"),
		);
		expect(local.get<string>("key")).toBe("value");
	});

	it("should remove and clear values in localStorage", () => {
		const { local } = useBrowserStorage();
		local.remove("key");
		expect(globalThis.localStorage.removeItem).toHaveBeenCalledWith("key");

		local.clear();
		expect(globalThis.localStorage.clear).toHaveBeenCalled();
	});

	it("should set and get values in sessionStorage", () => {
		const { session } = useBrowserStorage();
		session.set({ key: "value" });

		expect(globalThis.sessionStorage.setItem).toHaveBeenCalledWith(
			"key",
			JSON.stringify("value"),
		);
		(globalThis.sessionStorage.getItem as Mock).mockReturnValue(
			JSON.stringify("value"),
		);
		expect(session.get<string>("key")).toBe("value");
	});

	it("should remove and clear values in sessionStorage", () => {
		const { session } = useBrowserStorage();
		session.remove("key");
		expect(globalThis.sessionStorage.removeItem).toHaveBeenCalledWith("key");

		session.clear();
		expect(globalThis.sessionStorage.clear).toHaveBeenCalled();
	});
});
