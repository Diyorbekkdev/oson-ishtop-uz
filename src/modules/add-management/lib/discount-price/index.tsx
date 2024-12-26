export function calculateDiscountedPricePerDay(
	pricePerDay: number,
	discount: number,
	fixedDay: number,
): number {
	const discountedPricePerDay = pricePerDay - (pricePerDay * discount) / 100;
	const totalDiscountedPrice = discountedPricePerDay * fixedDay;

	let result = totalDiscountedPrice;
	if (discount === 0) return (result = pricePerDay);
	if (discount > 0) return (result = totalDiscountedPrice / fixedDay);

	return parseFloat(result.toFixed(2));
}

export function calculateDiscountedTotalPrice(
	pricePerDay: number,
	discount: number,
	fixedDay: number,
): number {
	const discountedPricePerDay = pricePerDay - (pricePerDay * discount) / 100;
	const totalDiscountedPrice = discountedPricePerDay * fixedDay;

	let result = totalDiscountedPrice;
	if (discount === 0) return (result = pricePerDay);
	if (discount > 0) return (result = totalDiscountedPrice);

	return parseFloat(result.toFixed(2));
}
