import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { PARAMS } from "../../model";
import { useJobCategoriesModals } from "../../store";
import { useCategoriesTab } from "../../store/tab.store";

const Header = () => {
	const { setModal } = useJobCategoriesModals();
	const { tabs } = useCategoriesTab();
	const { getParams } = useSearchParams();

	const data = tabs?.find((el) => el?.id === getParams(PARAMS.CATEGORY_ID));
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">{data?.title}</span>
				<Button
					color="success"
					onPress={() => {
						setModal({ child: { open: true, props: null } });
					}}
				>
					Category qo'shish
				</Button>
			</div>
			<Divider />
		</>
	);
};

export default Header;
