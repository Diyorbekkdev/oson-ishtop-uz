import { EyeIcon } from "@/assets/icons/signin.icons";
import { RESOURCE_PARAM } from "@/modules/users/model";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
} from "@nextui-org/drawer";
import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import { Snippet } from "@nextui-org/snippet";
import { Spinner } from "@nextui-org/spinner";
import { User } from "@nextui-org/user";
import { generateStatus } from "../../model";
import { useSelectedAddCache } from "../../services";
import { useAddsModals } from "../../store";
import { useAddsTab } from "../../store/tab.store";
import SwiperSlider from "./images";
import MapComponent from "./location-map";
import { AcceptAdd } from "./modals/accept";
import { RejectAdd } from "./modals/reject";
import SelectedAddTable from "./table";

const SelectedAdd = () => {
	const {
		data: { data: add, isLoading },
	} = useSelectedAddCache();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { tabs } = useAddsTab();
	const { setModal } = useAddsModals();

	const activeTab = tabs?.find((el) => el.id === add?.id);

	return (
		<div className="p-4">
			{/* HEADER OF THE PAGE */}
			<div className="flex items-center justify-between my-4">
				<h1 className="text-2xl font-semibold">{add?.jobName}</h1>
				<div className="flex items-center gap-4">
					<div>
						<User
							avatarProps={{
								src: `${RESOURCE_PARAM.FALLBACK_URL}`,
							}}
							description={<p>{activeTab?.info?.phone ?? "➖➖➖"}</p>}
							name={activeTab?.info?.fio ?? "No User Name"}
						/>
					</div>
					<div>
						<Chip
							color={generateStatus(add?.status!).color as any}
							variant="bordered"
						>
							{generateStatus(add?.status!).label ?? "➖➖➖"}
						</Chip>
					</div>
				</div>
			</div>

			{/* IMAGES */}
			<SwiperSlider />

			<Divider className="my-2" />

			{/* DATA TABLE */}
			<div className="my-4">
				<SelectedAddTable />
			</div>

			<div className="flex flex-col gap-2">
				<Accordion variant="shadow" disableAnimation key={"categories"}>
					<AccordionItem
						key="Ish Kategoriyasi"
						aria-label="Ish Kategoriyasi"
						title={
							<div>
								Ish Kategoriyasi:{"  "}
								<Chip color="success">{add?.jobCategories?.parents?.name}</Chip>
							</div>
						}
					>
						{
							<div className="flex items-center flex-wrap gap-3">
								{add?.jobCategories?.children?.map((el) => (
									<Chip key={el.id} color="success" variant="bordered">
										{el.name}
									</Chip>
								))}
							</div>
						}
					</AccordionItem>
				</Accordion>
				<Accordion variant="shadow" disableAnimation key={"description"}>
					<AccordionItem
						key="1"
						aria-label="E'lon tafsiloti"
						title="E'lon tafsiloti"
					>
						{add?.description}
					</AccordionItem>
				</Accordion>
			</div>

			<div className="py-4 grid grid-cols-2 gap-4">
				<div>
					<div className="flex items-center justify-between py-2">
						<h4 className="text-2xl">Aloqa uchun</h4>
					</div>
					<div>
						{add?.annContacts?.map((el) => (
							<Card className="w-full">
								<CardHeader className="flex gap-3">
									<Image
										alt="heroui logo"
										height={40}
										radius="sm"
										src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
										width={40}
									/>
									<div className="flex flex-col">
										<p className="text-md">{el?.name ?? "➖➖➖"}</p>
									</div>
								</CardHeader>
								<Divider />
								<CardBody className="flex flex-col gap-2">
									<div className="flex gap-3">
										<div className="flex items-center gap-2">
											<p className="text-md font-bold">Telegram Username:</p>
											<Snippet
												size="sm"
												prefix=""
												classNames={{
													symbol: "hidden",
												}}
											>
												{el?.tgUsername}
											</Snippet>
										</div>
									</div>
									<Divider />
									<div className="flex gap-3">
										<div className="flex items-center gap-2">
											<p className="text-md font-bold">Telefon Raqamlar:</p>
											{el?.numbers?.map((el) => (
												<Snippet
													size="sm"
													prefix=""
													classNames={{
														symbol: "hidden",
													}}
												>
													{el}
												</Snippet>
											))}
										</div>
									</div>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
				<div>
					<div className="flex items-center justify-between py-2">
						<h4 className="text-2xl">Joylashuv</h4>
						<Button color="success" key="s" onPress={() => onOpen()}>
							<EyeIcon />
						</Button>
					</div>
					{!isOpen && (
						<Card>
							{isLoading ? (
								<Spinner />
							) : (
								<MapComponent
									latitude={Number(add?.lat)}
									longitude={Number(add?.lon)}
									address={String(add?.company)}
								/>
							)}
						</Card>
					)}
				</div>
			</div>

			<Divider className="my-4" />
			<div className="flex items-center gap-4">
				<Button
					fullWidth
					color="success"
					isDisabled={add?.status === "ACCEPTED"}
					onPress={() => {
						setModal({
							accept: { open: true, props: add },
						});
					}}
				>
					E'lonni Tasdiqlash
				</Button>
				<Button
					fullWidth
					color="danger"
					isDisabled={add?.status === "REJECTED"}
					onPress={() => {
						setModal({
							reject: { open: true, props: add && add },
						});
					}}
				>
					E'lonni Rad Etish
				</Button>
			</div>

			{/* Modals */}
			<Drawer isOpen={isOpen} size={"full"} onClose={onClose}>
				<DrawerContent>
					{(onClose) => (
						<>
							<DrawerHeader className="flex flex-col gap-1">
								Joylashuv
							</DrawerHeader>
							<DrawerBody>
								<Card>
									<MapComponent
										latitude={Number(add?.lat)}
										longitude={Number(add?.lon)}
										address={String(add?.company)}
										height="100vh"
									/>
								</Card>
							</DrawerBody>
							<DrawerFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
								</Button>
							</DrawerFooter>
						</>
					)}
				</DrawerContent>
			</Drawer>
			{/* Additional Modals */}
			<AcceptAdd />
			<RejectAdd />
		</div>
	);
};

export default SelectedAdd;
