import { TUserRole } from "@/types";

export const hasPermission = <T extends string>({
	role,
	permission,
	permissionsMap,
}: {
	role: TUserRole;
	permission: T;
	permissionsMap: { [key: string]: string[] };
}) => {
	return permissionsMap[role]?.includes(permission) ?? false;
};
