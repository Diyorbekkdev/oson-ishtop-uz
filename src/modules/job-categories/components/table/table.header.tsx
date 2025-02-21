import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useJobCategoriesModals } from "../../store";

export const AddManagementHeader = () => {
	const { setModal } = useJobCategoriesModals();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">ISh kategoriyalari</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ create: { open: true, props: null } });
					}}
				>
					Kategoriya qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};
