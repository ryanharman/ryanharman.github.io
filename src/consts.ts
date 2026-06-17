export const SITE_TITLE =
	"Ryan Harman - Software Engineer / Frontend Developer | Manchester | UK";

const yoe = new Date().getFullYear() - 2018;
export const SITE_DESCRIPTION = `A Software Engineer specialising in web technologies with ${yoe} years experience. I work with enterprises, startups and small businesses to build robust, scalable products`;

// Site owner identity, used to build the schema.org Person/WebSite structured
// data in BaseHead and reusable anywhere the canonical profile is needed.
export const AUTHOR = {
	name: "Ryan Harman",
	jobTitle: "Software Engineer",
	email: "me@ryanharman.dev",
	location: { city: "Manchester", countryCode: "GB" },
	// Profiles Google can use to corroborate the identity ("same as" links).
	sameAs: [
		"https://github.com/ryanharman",
		"https://www.linkedin.com/in/ryan-harman63/",
	],
	knowsAbout: [
		"React",
		"Node.js",
		"TypeScript",
		"AWS",
		"Frontend Development",
		"Web Development",
	],
};
