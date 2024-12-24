<script lang="ts">
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
	import type { PageData } from './$types.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import DocsPager from '$lib/components/Pager.svelte';
	import TableOfContents from '$lib/components/TOC.svelte';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageData;
	$: markdown = data.component;
	$: doc = data.metadata;
</script>

<MetaTags
	title="{doc.title} - Vale CLI"
	description={doc.description}
	canonical="https://vale.sh"
	openGraph={{
		url: 'https://vale.sh',
		title: 'Vale: Your style, our editor',
		description:
			'Vale is a command-line tool that brings code-like linting to prose. Vale is cross-platform (Windows, macOS, and Linux), written in Go, and available on GitHub.',
		images: [
			{
				url: '/media/mac.png',
				width: 800,
				height: 600,
				alt: 'Example Vale output'
			}
		]
	}}
/>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
	<div class="mx-auto w-full min-w-0">
		<div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
			<div class="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
			<ChevronRight class="h-4 w-4" />
			<div id="section-name" class="overflow-hidden text-ellipsis whitespace-nowrap">
				{data.section}
			</div>
			<ChevronRight class="h-4 w-4" />
			<div class="font-medium text-foreground">{doc.title}</div>
		</div>
		<div class="docs-header space-y-2">
			<h1 class={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
				{doc.title}
			</h1>
			{#if doc.description}
				<p class="text-balance text-lg text-muted-foreground">
					{doc.description}
				</p>
			{/if}
		</div>
		<div class="mb-6">
			<svelte:component this={markdown} />
		</div>
		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div class="sticky top-14 -mt-10 h-[calc(100vh-3.5rem)] py-8">
			<ScrollArea class="h-full">
				{#key $page.url.pathname}
					<TableOfContents />
				{/key}
			</ScrollArea>
		</div>
	</div>
</main>
