import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useAddManagementModals } from "../../store";

export const AddManagementHeader = () => {
	const { setModal } = useAddManagementModals();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">E'lon Turlari</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ create: { open: true, props: null } });
					}}
				>
					E'lon Turini qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};
