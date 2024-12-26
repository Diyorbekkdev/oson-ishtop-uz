import { SearchIcon } from "@/assets/icons/global/gloval.icons";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Tab, Tabs } from "@nextui-org/tabs";

export const TopContent = () => {
	return (
		<Card
			className="dark:bg-dark-card flex flex-col gap-3"
			shadow="none"
			radius="none"
		>
			<Tabs fullWidth>
				<Tab title="Ingredientlar" />
				<Tab title="Taomlar" />
			</Tabs>
			<Input
				type="text"
				placeholder="Izlash"
				radius="sm"
				className="w-full"
				startContent={<SearchIcon size={20} />}
			/>
			<div className="w-full flex items-center gap-2">
				<Select
					items={[
						{ key: "1", label: "ingredient_group 1" },
						{ key: "2", label: "ingredient_group 2" },
						{ key: "3", label: "ingredient_group 3" },
					]}
					placeholder="Ingredient guruhi tanlang"
					name="ingredient_group"
					className="flex-1"
					radius="sm"
					onChange={(e) => console.log(e.target.name, e.target.value)}
				>
					{(ingredient_group) => (
						<SelectItem key={ingredient_group.key}>
							{ingredient_group.label}
						</SelectItem>
					)}
				</Select>
				<Select
					items={[
						{ key: "1", label: "Storage 1" },
						{ key: "2", label: "Storage 2" },
						{ key: "3", label: "Storage 3" },
					]}
					placeholder="Ombor tanlang"
					name="storage"
					className="flex-1"
					radius="sm"
					onChange={(e) => console.log(e.target.name, e.target.value)}
				>
					{(storage) => (
						<SelectItem key={storage.key}>{storage.label}</SelectItem>
					)}
				</Select>
			</div>
		</Card>
	);
};
