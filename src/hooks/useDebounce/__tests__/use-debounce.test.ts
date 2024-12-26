import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "..";

describe("useDebounce", () => {
	it("should debounce the value correctly", () => {
		vi.useFakeTimers();

		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: "initial", delay: 1000 },
			},
		);

		expect(result.current).toBe("initial");

		rerender({ value: "updated", delay: 1000 });

		expect(result.current).toBe("initial");

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		expect(result.current).toBe("updated");

		vi.useRealTimers();
	});

	it("should clean up timeouts on unmount", () => {
		vi.useFakeTimers();

		const { unmount } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: "initial", delay: 1000 },
			},
		);

		act(() => {
			vi.advanceTimersByTime(500);
		});

		unmount();

		act(() => {
			vi.advanceTimersByTime(500);
		});

		vi.useRealTimers();
	});
});
