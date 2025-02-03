import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { useSelectedAddCache } from "../../services";

const SelectedAdd = () => {
	const { data } = useSelectedAddCache();

	console.log(data);
	return (
		<div className="p-4">
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Ko'rishlar soni</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className="text-3xl">{data?.data?.viewCnt ?? 0}</p>
					</CardBody>
				</Card>
				<Card>
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Odamlar soni</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className="text-3xl">{data?.data?.peopleCnt ?? 0}</p>
					</CardBody>
				</Card>
				<Card>
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Oylik narhi</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<div className="flex items-center gap-4">
							<div>
								<span className="text-md text-3xl">
									{data?.data?.salaryFrom} so'm
								</span>
								<sub className="text-md text-2xl">dan</sub>
							</div>
							<Divider className="w-[40px]" />
							<div>
								<span className="text-md text-3xl">
									{data?.data?.salaryTo} so'm
								</span>
								<sub className="text-md text-2xl">gacha</sub>
							</div>
						</div>
					</CardBody>
				</Card>
				<Card>
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Sinov vaqti</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className="text-md text-3xl">{data?.data?.trialPeriod}</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default SelectedAdd;
