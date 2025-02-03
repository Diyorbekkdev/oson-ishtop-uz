import { useSearchParams } from "@/hooks/useSearchParams";
import { Pagination } from "@nextui-org/pagination";
import { Select, SelectItem } from "@nextui-org/select";
import { memo } from "react";

type TPagination = {
	page: number;
	setPage: (page: number) => void;
	pages: number;
};

export const BottomContent = memo(({ page, pages, setPage }: TPagination) => {
	const { setParams, getParams } = useSearchParams();
	return (
		<div className="py-2 px-2 flex justify-end items-center gap-4">
			<div className="flex items-center gap-2">
				<span className="text-small text-default-400">Ko'rsatish: </span>
				<Select
					items={[
						{ key: "10", label: "10" },
						{ key: "20", label: "20" },
						{ key: "30", label: "30" },
					]}
					defaultSelectedKeys={[getParams("page_size") ?? "10"]}
					className="min-w-[80px]"
					radius="sm"
					onChange={(e) => setParams({ page_size: e.target.value, page: "1" })}
				>
					{(storage) => (
						<SelectItem key={storage.key}>{storage.label}</SelectItem>
					)}
				</Select>
			</div>
			{pages > 1 && (
				<Pagination
					isCompact
					showControls
					showShadow
					color="success"
					classNames={{
						item: "",
					}}
					initialPage={1}
					page={page}
					total={pages}
					onChange={setPage}
				/>
			)}
		</div>
	);
});
