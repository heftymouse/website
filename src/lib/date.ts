const options: Intl.DateTimeFormatOptions = {
	dateStyle: 'medium'
};

const longOptions: Intl.DateTimeFormatOptions = {
	dateStyle: 'long'
};

export function formatDate(date: Date, long?: boolean): string {
	return Intl.DateTimeFormat(undefined, long ? longOptions : options).format(date);
}
