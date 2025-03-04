export const GlobalIcon = ({
	size = 20,
	viewBox = "0 0 20 20",
	fill = "none",
	...props
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox={viewBox}
			fill={fill}
			{...props}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961"
				stroke="#596066"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15 3C16.95 8.84 16.95 15.16 15 21"
				stroke="#596066"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
				stroke="#596066"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
				stroke="#596066"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
				stroke="#596066"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
