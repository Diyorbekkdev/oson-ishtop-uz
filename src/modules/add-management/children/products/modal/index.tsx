import { Helmet } from "react-helmet-async";
import ProductsPage from "./routes/modal.component";

const ProductModal = () => {
	return (
		<>
			<Helmet>
				<title>Products/Qo'shish - Foodify</title>
				<meta name="description" content="Other pages for Foodify" />
				<link rel="canonical" href="/Products" />
			</Helmet>
			<ProductsPage />
		</>
	);
};

export default ProductModal;
