import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { DocFile } from "$lib/types/docs.js";

export const load: PageLoad = async () => {
    // @ts-expect-error import doesn't recognize *.md modules _yet_
    const doc: DocFile = await import("$lib/content/index.md");
    if (!doc || !doc.metadata) {
        error(404);
    }
    return {
        section: "Topics",
        component: doc.default,
        metadata: doc.metadata,
        title: doc.metadata.title,
    };
};
