import { defineCollection, z } from "astro:content";

const thoughts = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		publishedAt: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
	}),
});

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		link: z.string().url(),
		stack: z.string(),
	}),
});

const experience = defineCollection({
	schema: z.object({
		company: z.string(),
		companyLink: z.string().url(),
		title: z.string(),
		stack: z.string(),
		location: z.string(),
		startDate: z.coerce.date(),
		// Omit endDate to mark a role as current ("Present").
		endDate: z.coerce.date().optional(),
		// Controls how the role appears in the CV without deleting the file:
		//   "full"            – company, role and description (default)
		//   "hideDescription" – company and role only, no description body
		//   "hidden"          – excluded entirely
		visibility: z.enum(["full", "hideDescription", "hidden"]).default("full"),
		// Marks a role as the umbrella/summary entry for its company block: it
		// renders first within the block and hides its individual date line (the
		// block header already shows the overall span). Used for freelance.
		lead: z.boolean().default(false),
	}),
});

export const collections = { thoughts, projects, experience };
