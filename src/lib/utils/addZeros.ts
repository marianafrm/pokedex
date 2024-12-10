export const addZeros = (number: number) => {
	const digits = number.toString().split('').map(Number);

	while (digits.length < 3) {
		digits.unshift(0);
	}

	return digits.join('');
};
