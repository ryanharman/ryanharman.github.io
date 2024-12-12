import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("thoughts");
  const content = await getCollection("content");
  const experience = await getCollection("experience");

  const posts_content_experience = [...posts, ...content, ...experience];

  const collectionMap = {
    experience: "/cv",
    projects: "/",
    thoughts: "/thoughts",
  };

  const rssItems = posts_content_experience.map((entry) => {
    let link = collectionMap[entry.collection];

    if (entry.collection === "thoughts") {
      link = `/thoughts/${entry.slug}/`;
    }

    return { ...entry.data, link };
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: rssItems,
  });
}
