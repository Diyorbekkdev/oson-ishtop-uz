import { renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, it } from "vitest";
import { useMatch } from "..";

describe("useMatch", () => {
	it("should return the current pathname", () => {
		const { result } = renderHook(() => useMatch(), {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/test/path"]}>{children}</MemoryRouter>
			),
		});

		expect(result.current.pathname).toBe("/test/path");
	});

	it("should correctly find and match the current route", () => {
		const { result } = renderHook(() => useMatch(), {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/test/path"]}>
					<Routes>
						<Route path="/test/path" element={<div />} />
					</Routes>
					{children}
				</MemoryRouter>
			),
		});

		expect(result.current.pathname).toBe("/test/path");
	});

	it("should return an empty object if no current route is found", () => {
		const { result } = renderHook(() => useMatch(), {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/unknown/path"]}>
					<Routes>
						<Route path="/known" element={<div />} />
					</Routes>
					{children}
				</MemoryRouter>
			),
		});

		const params = result.current.getParams<{ id?: string }>();

		expect(params).toEqual({});
	});
});
