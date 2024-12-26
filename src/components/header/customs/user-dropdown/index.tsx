import { useAuth } from "@/configs/auth";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { useQueryClient } from "@tanstack/react-query";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export const UserDropdown = () => {
	const signOut = useSignOut();
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const handleSignOut = () => {
		signOut();
		queryClient.clear();
		window.location.assign(`${window.location.origin}/sign-in`);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						isBordered: true,
						src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
					}}
					className="transition-transform"
					description={user?.role}
					name={user?.owner_fullname}
				/>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="User menu actions"
				onAction={() => console.log()}
			>
				<DropdownItem
					key="profile"
					className="flex flex-col justify-start w-full items-start"
				>
					<p>Signed in as</p>
					<p>zoey@example.com</p>
				</DropdownItem>
				<DropdownItem key="settings">My Settings</DropdownItem>
				<DropdownItem key="team_settings">Team Settings</DropdownItem>
				<DropdownItem key="analytics">Analytics</DropdownItem>
				<DropdownItem key="system">System</DropdownItem>
				<DropdownItem key="configurations">Configurations</DropdownItem>
				<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
				<DropdownItem
					key="logout"
					color="danger"
					className="text-danger"
					onClick={handleSignOut}
				>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
