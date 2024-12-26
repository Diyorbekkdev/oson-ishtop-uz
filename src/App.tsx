import { useMainFeatures } from "./features";
import Root from "./root";
import UnauthedRoot from "./unauthed-root";

function App() {
	const { shouldRenderMain } = useMainFeatures();
	return <>{shouldRenderMain() ? <Root /> : <UnauthedRoot />}</>;
}

export default App;
