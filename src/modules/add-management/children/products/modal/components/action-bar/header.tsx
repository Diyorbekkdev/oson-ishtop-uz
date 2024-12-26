import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";

export const ModalTopContent = () => {
	const navigate = useNavigate();
	return (
		<Card
			className="dark:bg-dark-card flex flex-row justify-between items-center p-4"
			shadow="none"
		>
			<h2 className="text-xl font-semibold">Mahsulot qo'shish</h2>
			<div className="flex items-center gap-3">
				<Button
					color="success"
					variant="flat"
					onClick={() => navigate("/dashboard/products")}
				>
					Bekor qilish
				</Button>
				<Button color="success" className="text-white">
					Qo'shish
				</Button>
			</div>
		</Card>
	);
};
