import { useSearchParams } from "@/hooks/useSearchParams";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import Profile from "./profile";
import Security from "./security";

const UserSettings = () => {
	const { getParams, setParams, removeParamsByKey } = useSearchParams();
	const generateTitle = () => {
		const headings = {
			profile: "User Profile",
			security: "Security Settings",
		};

		const tab = getParams("tab") as "profile" | "security" | undefined;
		return headings[tab ?? "profile"];
	};
	return (
		<div>
			<Modal
				isOpen={false}
				onClose={() => {
					removeParamsByKey({ keys: ["tab"] });
				}}
				size="5xl"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1" title={"User Settings"}>
						{generateTitle()}
					</ModalHeader>
					<ModalBody className="pt-6  px-0">
						<div className=" h-[calc(100dvh-400px)]">
							<Tabs
								variant="light"
								isVertical
								fullWidth
								className="w-[300px] items-baseline"
								onSelectionChange={(e) => {
									if (e === "0") {
										setParams({ tab: "profile" });
									} else {
										setParams({ tab: "security" });
									}
								}}
							>
								<Tab
									className="flex-grow w-full overflow-y-auto"
									title="Profile"
									key={0}
								>
									<Profile />
								</Tab>
								<Tab key={1} className="flex-grow w-full" title="Security">
									<Security />
								</Tab>
							</Tabs>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default UserSettings;
