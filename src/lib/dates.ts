// Date helpers for the CV / experience section. Roles store real dates
// (startDate, optional endDate); an omitted endDate means the role is current.

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/** "Sep 2019" */
export function formatMonthYear(date: Date): string {
	return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "Sep 2019 – Jun 2021" or "Mar 2024 – Present" when endDate is omitted. */
export function formatRange(start: Date, end?: Date): string {
	return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;
}

/**
 * Whole-month tenure between two dates, rendered as "1 yr 10 mos".
 * A missing end date is treated as today. Rounds up so a part-month
 * role still reads as "1 mo" rather than "0 mos".
 */
export function durationLabel(start: Date, end?: Date): string {
	const to = end ?? new Date();
	let months =
		(to.getFullYear() - start.getFullYear()) * 12 +
		(to.getMonth() - start.getMonth()) +
		1;
	if (months < 1) months = 1;

	const years = Math.floor(months / 12);
	const remMonths = months % 12;

	const parts: string[] = [];
	if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
	if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
	return parts.join(" ");
}

/**
 * Whole years of experience between a start date and now (or `end`),
 * rounded UP to the nearest year. A missing end date is treated as today.
 * Used for the headline "N years of commercial experience" line.
 */
export function yearsOfExperience(start: Date, end?: Date): number {
	const to = end ?? new Date();
	const months =
		(to.getFullYear() - start.getFullYear()) * 12 +
		(to.getMonth() - start.getMonth());
	return Math.max(1, Math.ceil(months / 12));
}

/** Splits a comma-separated stack string into trimmed, lowercased tokens. */
export function parseStack(stack: string): string[] {
	return stack
		.split(",")
		.map((s) => s.trim().toLowerCase())
		.filter(Boolean);
}
