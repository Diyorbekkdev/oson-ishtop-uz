import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { PARAMS } from "../../model";
import { useAddManagementModals } from "../../store";
import { useAddManagementTab } from "../../store/tabs.store";

const Header = () => {
	const { setModal } = useAddManagementModals();
	const { tabs } = useAddManagementTab();
	const { getParams } = useSearchParams();

	const data = tabs?.find((el) => el?.id === getParams(PARAMS.ADD_TYPE_ID));
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">{data?.title}</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ discount: { open: true, props: null } });
					}}
				>
					Discount qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};

export default Header;
