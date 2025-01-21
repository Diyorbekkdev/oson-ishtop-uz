import { useTheme } from "next-themes";
import { Drawer } from "vaul";
import Details from "./customs/details";
import Header from "./customs/header";

const snapPoints = [0.4, 0.7, 0.9];

const Panel = () => {
	const { resolvedTheme } = useTheme();
	return (
		<Drawer.Root
			snapPoints={snapPoints}
			//   activeSnapPoint={analysisPanel.snap}
			//   setActiveSnapPoint={(snap) =>
			//     setModal({ analysisPanel: { ...analysisPanel, snap: snap as any } })
			//   }
			open={true}
			onClose={() => {}}
		>
			<Drawer.Portal>
				<Drawer.Content
					className={`fixed w-full shadow-md cursor-pointer border-t border-solid rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] flex flex-col mr-12 ${
						true ? "ml-[256px]" : "ml-12"
					}   ${resolvedTheme === "dark" ? "bg-[#090e14]" : "bg-[#fff]"}`}
				>
					<div
						aria-hidden
						className={
							"mx-auto w-12 h-1.5 flex-shrink-0 rounded-full mt-4 bg-[#f4f4f4] dark:bg-[#262626]"
						}
					/>
					<Header />
					<Details />
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default Panel;
