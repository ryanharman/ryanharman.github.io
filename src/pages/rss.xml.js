import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
	// Only "thoughts" are real, dated articles. Projects and experience have no
	// description/pubDate and no unique per-entry URL, so including them produced
	// invalid RSS items (missing dates, duplicate links). Keep the feed to posts.
	const posts = (await getCollection("thoughts")).sort(
		(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedAt,
			link: `/thoughts/${post.slug}/`,
		})),
	});
}
