import { Pagination } from "@nextui-org/pagination";
import { Select, SelectItem } from "@nextui-org/select";
import { memo } from "react";

type TPagination = {
	page: number;
	setPage: (page: number) => void;
	pages: number;
};

export const BottomContent = memo(({ page, pages, setPage }: TPagination) => {
	return (
		<div className="py-2 px-2 flex justify-end items-center gap-4">
			<div className="flex items-center gap-2">
				<span className="text-small text-default-400">Ko'rsatish: </span>
				<Select
					items={[
						{ key: "1", label: "10" },
						{ key: "2", label: "20" },
						{ key: "3", label: "30" },
					]}
					defaultSelectedKeys={["1"]}
					className="min-w-[80px]"
					radius="sm"
				>
					{(storage) => (
						<SelectItem key={storage.key}>{storage.label}</SelectItem>
					)}
				</Select>
			</div>
			<Pagination
				isCompact
				showControls
				showShadow
				color="success"
				classNames={{
					item: "",
				}}
				page={page}
				total={pages}
				onChange={setPage}
			/>
		</div>
	);
});