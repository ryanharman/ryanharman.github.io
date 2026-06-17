import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { SITE_DESCRIPTION } from "../../consts";

const posts = await getCollection("thoughts");

// One entry per generated image. Static pages get a brand-forward card (name as
// the headline); posts use their own title so a shared link previews the piece.
const pages: Record<string, { title: string; description: string }> = {
	home: { title: "Ryan Harman", description: SITE_DESCRIPTION },
	about: {
		title: "Ryan Harman",
		description: "About — who I am and what I build.",
	},
	thoughts: {
		title: "Ryan Harman",
		description: "Thoughts — writing on engineering, AI and the craft.",
	},
	cv: {
		title: "Ryan Harman",
		description: "CV — experience, skills and background.",
	},
	...Object.fromEntries(
		posts.map((post) => [
			`thoughts/${post.slug}`,
			{ title: post.data.title, description: post.data.description },
		]),
	),
};

export const { getStaticPaths, GET } = await OGImageRoute({
	param: "route",
	pages,
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		// Match the site palette: zinc-tinted light background, near-black text,
		// muted description, and a primary-coloured strip along the bottom edge.
		bgGradient: [
			[228, 228, 231],
			[212, 212, 216],
		],
		font: {
			title: { color: [24, 24, 27], size: 64, weight: "Bold", lineHeight: 1.2 },
			description: { color: [82, 82, 91], size: 30, lineHeight: 1.4 },
		},
		border: { color: [24, 24, 27], width: 16, side: "block-end" },
		padding: 70,
	}),
});
