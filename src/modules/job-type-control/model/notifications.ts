import { NOTIFICATION_TYPE, NotificationMessage } from "@/types";

//NOTIFICATION SUCCESS CODES
export enum JOB_TYPE_CONTROL_SUCCESS_CODES {
	CREATED = "JOB_TYPE_CONTROL_CREATED",
	UPDATED = "JOB_TYPE_CONTROL_UPDATED",
	REMOVED = "JOB_TYPE_CONTROL_REMOVED",
}

//NOTIFICATION INFO CODES
export enum JOB_TYPE_CONTROL_INFO_CODES {}

//NOTIFICATION WARNING CODES
export enum JOB_TYPE_CONTROL_WARNING_CODES {}

//NOTIFICATION SUCCESS MESSAGES
export const JOB_TYPE_CONTROL_SUCCESS_MESSAGES: Record<
	JOB_TYPE_CONTROL_SUCCESS_CODES,
	NotificationMessage
> = {
	[JOB_TYPE_CONTROL_SUCCESS_CODES.CREATED]: {
		title: "Job type control [name] yaratildi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[JOB_TYPE_CONTROL_SUCCESS_CODES.UPDATED]: {
		title: "Job type control [name] tahrirlandi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
	[JOB_TYPE_CONTROL_SUCCESS_CODES.REMOVED]: {
		title: "Job type control [name] o'chirildi",
		subtitle: "Success",
		kind: NOTIFICATION_TYPE.SUCCESS,
	},
};

//NOTIFICATION INFO MESSAGES
export const JOB_TYPE_CONTROL_INFO_MESSAGES: Record<
	JOB_TYPE_CONTROL_INFO_CODES,
	NotificationMessage
> = {};
