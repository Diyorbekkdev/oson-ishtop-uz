import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useJobTypeControlModals } from "../../store";

export const JobTypeControlHeader = () => {
	const { setModal } = useJobTypeControlModals();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">
					Bandlik turlarini boshqarish
				</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ create: { open: true, props: null } });
					}}
				>
					Qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};
