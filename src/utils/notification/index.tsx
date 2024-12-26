import { NotificationMessage } from "@/types";

export const formatNotification = (
	template: NotificationMessage,
	replacements: Record<string, string>,
): NotificationMessage => {
	const replacePlaceholders = (text: string) =>
		text.replace(/\[([^\]]+)\]/g, (_, key) => replacements[key] || `[${key}]`);

	return {
		title: replacePlaceholders(template.title),
		subtitle: replacePlaceholders(template.subtitle),
		kind: template.kind,
	};
};
