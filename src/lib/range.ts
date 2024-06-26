export const range = (start: number, stop: number, step = 1) => {
	if (step > 0 && start > stop)
		throw new Error("When step is positive, start must be smaller than stop.");
	if (step < 0 && start < stop)
		throw new Error("When step is negative, start must be greater than stop.");

	return _range(start, stop, step, []);
};

const _range = (start: number, stop: number, step: number, acc: number[]) => {
	if (start < stop + 1) {
		acc.push(start);
		return _range(start + step, stop, step, acc);
	}
	return acc;
};
