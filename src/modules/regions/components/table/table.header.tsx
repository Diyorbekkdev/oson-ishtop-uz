import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRegionsModals } from "../../store";

export const AddManagementHeader = () => {
	const { setModal } = useRegionsModals();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">Joylashuvlar</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ create: { open: true, props: null } });
					}}
				>
					Manzil qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};
