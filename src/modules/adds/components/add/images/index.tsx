import { RESOURCE_PARAM } from "@/modules/adds/model";
import { useSelectedAddCache } from "@/modules/adds/services";
import { Button } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Zoom from "react-medium-image-zoom";

const SwiperSlider = () => {
	const { data } = useSelectedAddCache();
	const sortedResources =
		(data?.data?.resources &&
			data?.data?.resources?.sort((a, b) => a?.ordering - b?.ordering)) ??
		[];
	return (
		<div className="flex items-center gap-2  border-2 border-dotted w-full overflow-x-auto rounded-md p-4">
			{sortedResources?.map((el) => (
				<Card
					isFooterBlurred
					className="border-none"
					radius="lg"
					key={el?.resourcesId}
				>
					<Zoom>
						<Image
							alt="Woman listing to music"
							className="object-cover"
							height={200}
							src={
								el?.resourcesId
									? `${RESOURCE_PARAM.URL}${el?.resourcesId}`
									: `${RESOURCE_PARAM.FALLBACK_URL}`
							}
							width={200}
						/>
					</Zoom>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<p className="text-tiny text-white/80">Tartib Raqami</p>
						<Button
							className="text-tiny text-white bg-black/20"
							color="default"
							radius="lg"
							size="sm"
							variant="flat"
						>
							{el?.ordering}
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default SwiperSlider;
