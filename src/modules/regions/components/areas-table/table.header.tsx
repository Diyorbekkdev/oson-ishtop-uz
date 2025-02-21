import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { PARAMS } from "../../model";
import { useRegionsModals } from "../../store";
import { useAreasTab } from "../../store/tab.store";

const Header = () => {
	const { setModal } = useRegionsModals();
	const { tabs } = useAreasTab();
	const { getParams } = useSearchParams();

	const data = tabs?.find((el) => el?.id === getParams(PARAMS.REGION_ID));
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">{data?.title}</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ areas: { open: true, props: null } });
					}}
				>
					Manzil qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};

export default Header;
