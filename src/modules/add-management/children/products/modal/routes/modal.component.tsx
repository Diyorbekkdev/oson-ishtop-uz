import { ModalTopContent } from "../components/action-bar/header";
import { ProductModalTable } from "../components/table";

const ProductModal = () => {
	return (
		<div className="flex flex-col gap-5">
			<ModalTopContent />
			<ProductModalTable />
		</div>
	);
};

export default ProductModal;
