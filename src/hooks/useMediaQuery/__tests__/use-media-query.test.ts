import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useBreakpoints } from "..";

const mockMatchMedia = vi.fn();

beforeEach(() => {
	mockMatchMedia.mockReset();
	window.matchMedia = mockMatchMedia;
});

describe("useBreakpoints", () => {
	it("should correctly identify the active breakpoint on initial render", () => {
		mockMatchMedia.mockImplementation((query) => ({
			matches: query === "(max-width: 640px)", // Mock for xs breakpoint
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			media: query,
		}));

		const { result } = renderHook(() => useBreakpoints());

		expect(result.current.isXs).toBe(true);
		expect(result.current.isSm).toBe(false);
		expect(result.current.isMd).toBe(false);
		expect(result.current.isLg).toBe(false);
		expect(result.current.active).toBe("xs");
	});

	it("should handle multiple breakpoints", () => {
		mockMatchMedia.mockImplementation((query) => ({
			matches:
				query === "(max-width: 640px)" ||
				query === "(min-width: 641px) and (max-width: 768px)" ||
				query === "(min-width: 769px) and (max-width: 1024px)" ||
				query === "(min-width: 1025px)",
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			media: query,
		}));

		const { result } = renderHook(() => useBreakpoints());

		expect(result.current.isXs).toBe(true);
		expect(result.current.isSm).toBe(true);
		expect(result.current.isMd).toBe(true);
		expect(result.current.isLg).toBe(true);
		expect(result.current.active).toBe("lg");
	});

	it('should default to "SSR" when no breakpoints match', () => {
		mockMatchMedia.mockImplementation(() => ({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			media: "",
		}));

		const { result } = renderHook(() => useBreakpoints());

		expect(result.current.isXs).toBe(false);
		expect(result.current.isSm).toBe(false);
		expect(result.current.isMd).toBe(false);
		expect(result.current.isLg).toBe(false);
		expect(result.current.active).toBe("SSR");
	});
});
