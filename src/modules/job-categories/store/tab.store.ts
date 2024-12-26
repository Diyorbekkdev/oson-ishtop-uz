import { ITab } from "@/types";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TABS } from "../model";

type RolesTab = {
	tabs: ITab[];
	addTab: (params: ITab) => void;
	clearTab: () => void;
	closeTab: (params: { id: string }) => ITab | null;
	updateTab: (payload: ITab) => void;
	resetState: () => void;
	batchCloseTab: (params: string[]) => void;
};

const tabStore: StateCreator<RolesTab> = (set, get) => {
	return {
		tabs: [],
		addTab: (payload) => {
			const { tabs } = get();

			if (tabs.find((tab) => payload.id === tab.id)) return;

			set({
				tabs: [...tabs, payload],
			});
		},
		closeTab: ({ id }) => {
			const { tabs } = get();

			const index = tabs.findIndex((tab) => id === tab.id);

			let newIndex: number;

			if (index > 0) newIndex = index - 1;
			else if (index === 0 && tabs.length > 1) newIndex = 1;
			else newIndex = -1;

			const newTabs = tabs.filter((tab) => tab.id !== id);

			set({ tabs: newTabs });

			if (newIndex > -1) return tabs[newIndex];

			return null;
		},
		clearTab: () => set({ tabs: [] }),
		updateTab: (payload) => {
			const { tabs } = get();

			set({
				tabs: tabs.map((tab) =>
					tab.id === payload.id ? { ...tab, ...payload } : tab,
				),
			});
		},
		resetState: () => {
			const storageName = `${localStorage.getItem(TABS.KEY)}`;

			const storage = JSON.parse(
				sessionStorage.getItem(storageName) ?? "",
			) as RolesTab | null;

			set(() => ({ tabs: storage?.tabs ?? [] }));
		},
		batchCloseTab: (ids) => {
			const { tabs } = get();

			set({
				tabs: tabs.filter((tab) => !ids.includes(tab.id)),
			});
		},
	};
};

const createTabStore = () => {
	return create<RolesTab>()(
		persist(tabStore, {
			name: `${localStorage.getItem(TABS.KEY)}`,
			storage: createJSONStorage(() => sessionStorage),
		}),
	);
};

const rolesTabs: ReturnType<typeof createTabStore>[] = [];

export const useCategoriesTab = () => {
	const storageKey = `${localStorage.getItem(TABS.KEY)}`;
	const foundStore = rolesTabs.find(
		({ persist }) => persist?.getOptions().name === storageKey,
	);

	if (!foundStore) rolesTabs.push(createTabStore());

	return foundStore?.()!;
};
