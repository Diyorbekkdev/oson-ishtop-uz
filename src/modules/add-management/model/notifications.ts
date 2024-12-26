import { NOTIFICATION_TYPE, NotificationMessage } from "@/types";

//NOTIFICATION SUCCESS CODES
export enum ADD_SUCCESS_CODES {
	CREATED = "ADD_CREATED",
	UPDATED = "ADD_UPDATED",
	REMOVED = "ADD_REMOVED",
}

//NOTIFICATION INFO CODES
export enum ADD_INFO_CODES {}

//NOTIFICATION WARNING CODES
export enum ADD_WARNING_CODES {}

//NOTIFICATION SUCCESS MESSAGES
export const ADD_SUCCESS_MESSAGES: Record<
	ADD_SUCCESS_CODES,
	NotificationMessage
> = {
	[ADD_SUCCESS_CODES.CREATED]: {
		title: "E'lon [name] yaratildi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[ADD_SUCCESS_CODES.UPDATED]: {
		title: "E'lon [name] tahrirlandi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[ADD_SUCCESS_CODES.REMOVED]: {
		title: "E'lon [name] o'chirildi",
		subtitle: "Blueprint [name] has been created.",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
};

//NOTIFICATION INFO MESSAGES
export const BLUEPRINT_INFO_MESSAGES: Record<
	ADD_INFO_CODES,
	NotificationMessage
> = {};
