import { NOTIFICATION_TYPE, NotificationMessage } from "@/types";

//NOTIFICATION SUCCESS CODES
export enum REGION_SUCCESS_CODES {
	CREATED = "REGION_CREATED",
	UPDATED = "REGION_UPDATED",
	REMOVED = "REGION_REMOVED",
}

//NOTIFICATION INFO CODES
export enum REGION_INFO_CODES {}

//NOTIFICATION WARNING CODES
export enum REGION_WARNING_CODES {}

//NOTIFICATION SUCCESS MESSAGES
export const REGION_SUCCESS_MESSAGES: Record<
	REGION_SUCCESS_CODES,
	NotificationMessage
> = {
	[REGION_SUCCESS_CODES.CREATED]: {
		title: "Region [name] yaratildi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[REGION_SUCCESS_CODES.UPDATED]: {
		title: "Region [name] tahrirlandi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[REGION_SUCCESS_CODES.REMOVED]: {
		title: "Region [name] o'chirildi",
		subtitle: "Subtitle",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
};

//NOTIFICATION INFO MESSAGES
export const BLUEPRINT_INFO_MESSAGES: Record<
	REGION_INFO_CODES,
	NotificationMessage
> = {};
