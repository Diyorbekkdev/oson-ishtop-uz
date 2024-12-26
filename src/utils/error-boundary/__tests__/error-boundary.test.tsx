import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorBoundary } from "..";

const ThrowError: React.FC = () => {
	throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
	it("should render fallback UI when an error is thrown", () => {
		const { asFragment } = render(
			<ErrorBoundary data-testid="error-component">
				<ThrowError />
			</ErrorBoundary>,
		);
		expect(screen.getByTestId("error-component")).toBeInTheDocument();
		expect(screen.getByText("Something is wrong")).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});
});
