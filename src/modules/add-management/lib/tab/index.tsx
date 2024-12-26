import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TTab } from "@/types";
import { TABS } from "../../model";
import { setTabs } from "../../store";

type ON_ADD = (T: TTab) => void;
type ON_CLOSE = (T: TTab) => TTab | null;

type Tabs = {
	onAdd: ON_ADD;
	onClose: ON_CLOSE;
};

export const useTabs = (): Tabs => {
	const dispatch = useReduxDispatch();
	const { tabs } = useReduxSelector(({ add_management }) => add_management);
	const { setParams, removeParamsByKey, getParams } = useSearchParams();

	const onAdd: ON_ADD = (tab) => {
		setParams({ add: String(tab?.id) });
		const foundTab = tabs.find(({ id }) => id === tab.id);
		if (foundTab) return;

		dispatch(setTabs([...tabs, tab]));

		localStorage.setItem(TABS.KEY, JSON.stringify([...tabs, tab]));
	};

	const onClose: ON_CLOSE = (tab) => {
		const index = tabs.findIndex(({ id }) => id === tab?.id);

		const newTabs = tabs.filter(({ id }) => id !== tab?.id);

		localStorage.setItem(TABS.KEY, JSON.stringify(newTabs));
		dispatch(setTabs(newTabs));

		const selectedKey = getParams("add");

		if (newTabs.length === 0) {
			removeParamsByKey({ keys: ["add"] });
		} else {
			if (String(tab.id) === selectedKey) {
				const newIndex = index > 0 ? index - 1 : 0;
				setParams({ add: String(newTabs[newIndex]?.id) });
			} else {
				setParams({ add: String(selectedKey) });
			}
		}

		return newTabs.length > 0 ? newTabs[index > 0 ? index - 1 : 0] : null;
	};

	return { onAdd, onClose };
};
