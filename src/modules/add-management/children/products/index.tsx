import { Helmet } from "react-helmet-async";
import { Outlet, useOutlet } from "react-router-dom";
import ProductsPage from "./routes/products.component";

const Products = () => {
	const hasOutlet = useOutlet();
	if (hasOutlet) return <Outlet />;
	return (
		<>
			<Helmet>
				<title>Products - Foodify</title>
				<meta name="description" content="Other pages for Foodify" />
				<link rel="canonical" href="/Products" />
			</Helmet>
			<ProductsPage />
		</>
	);
};

export default Products;
