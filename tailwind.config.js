const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|avatar|badge|button|calendar|card|date-picker|divider|dropdown|image|input|menu|modal|navbar|pagination|popover|select|skeleton|spacer|spinner|toggle|table|tabs|user|ripple|date-input|form|listbox|scroll-shadow|checkbox).js"
  ],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0fce9",
					100: "#daf8c5",
					200: "#bdf19b",
					300: "#9fea71",
					400: "#82e44a",
					500: "#60D431",
					600: "#4aba29",
					700: "#379221",
					800: "#28691a",
					900: "#1a4111",
					1000: "#090E14",
					"even-row": "#f5f6f7",
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					50: "#e3e5e7",
					100: "#b8bcc1",
					200: "#8a909a",
					300: "#5e6473",
					400: "#3b414f",
					500: "#090E14",
					600: "#080c11",
					700: "#070a0e",
					800: "#05070a",
					900: "#040506",
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				dark: {
					50: "red",
					1000: "#fff",
					"even-row": "#ffffff05",
					"hover-row": "#ffffff10",
					card: "#13181d",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [nextui(), require("tailwindcss-animate")],
};
