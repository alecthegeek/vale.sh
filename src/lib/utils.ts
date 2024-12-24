import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { get, writable } from "svelte/store";
import { error } from "@sveltejs/kit";
import type { DocResolver } from "$lib/types/docs.js";

export const isBrowser = typeof document !== "undefined";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export function copyStringToClipboard(str: string) {
    if (!isBrowser) return;
    navigator.clipboard.writeText(str);
}

function stripPrompt(str: string) {
    return str.replace(/^\$|> /, "");
}

export function createCopyCodeButton() {
    const codeString = writable("");
    const copied = writable(false);
    let copyTimeout = 0;

    function copyCode() {
        if (!isBrowser) return;
        navigator.clipboard.writeText(stripPrompt(get(codeString)));
        copied.set(true);
        clearTimeout(copyTimeout);
        copyTimeout = window.setTimeout(() => {
            copied.set(false);
        }, 2500);
    }

    function setCodeString(node: HTMLElement) {
        codeString.set(node.innerText.trim() ?? "");
    }

    return {
        copied,
        copyCode,
        setCodeString,
        codeString,
    };
}

export function slugFromPath(path: string) {
    return path.replace("/src/lib/content/", "").replace(".md", "");
}

function getIndexDocIfExists(slug: string, modules: Modules) {
    let match: { path?: string; resolver?: DocResolver } = {};

    for (const [path, resolver] of Object.entries(modules)) {
        if (path.includes(`/${slug}/index.md`)) {
            match = { path, resolver: resolver as unknown as DocResolver };
            break;
        }
    }

    return match;
}

type Modules = Record<string, () => Promise<unknown>>;

function findMatch(slug: string, modules: Modules) {
    let match: { path?: string; resolver?: DocResolver } = {};

    for (const [path, resolver] of Object.entries(modules)) {
        if (slugFromPath(path) === slug) {
            match = { path, resolver: resolver as unknown as DocResolver };
            break;
        }
    }
    if (!match.path) {
        match = getIndexDocIfExists(slug, modules);
    }

    return match;
}

function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export async function getDoc(slug: string) {
    const modules = import.meta.glob(`$lib/content/**/*.md`);
    const match = findMatch(slug, modules);
    const doc = await match?.resolver?.();

    if (!doc || !doc.metadata) {
        error(404);
    }

    let folder = capitalize(slug.replace("/docs/", ""));

    if (folder === doc.metadata.title || folder == "Vale.ini") {
        folder = "Topics";
    } else {
        folder = folder.split("/")[0]
    }

    return {
        section: folder,
        component: doc.default,
        metadata: doc.metadata,
        title: doc.metadata.title,
    };
}
