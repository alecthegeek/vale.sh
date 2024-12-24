<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import { MainNav, MobileNav } from '$lib/components/nav';
	import { Icons } from '$lib/components/icons';
	import { buttonVariants } from '$lib/components/ui/button';
	import { siteConfig } from '$lib/config/site.js';
	import { cn } from '$lib/utils.js';
	import docsearch from '@docsearch/js';
	import { onMount } from 'svelte';

	onMount(() => {
		docsearch({
			container: '#docsearch',
			appId: '2Y8OU39U1X',
			indexName: 'docsearch_mock',
			apiKey: '0e82d6007f06d9f280629a37bb8a0892'
		});
	});
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<!--<Banner />-->
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<MobileNav />
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<div class="w-full flex-1 md:w-auto md:flex-none">
				<div id="docsearch"></div>
			</div>
			<nav class="flex items-center">
				<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 w-8 px-0'
						)}
					>
						<Icons.GitHub class="h-4 w-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
				<a href={siteConfig.links.slack} target="_blank" rel="noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 w-8 px-0'
						)}
					>
						<Icons.Slack class="h-3 w-3 fill-current" />
						<span class="sr-only">Slack</span>
					</div>
				</a>
				<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 w-8 px-0'
						)}
					>
						<Icons.Twitter class="h-3 w-3 fill-current" />
						<span class="sr-only">X (formerly known as Twitter)</span>
					</div>
				</a>
				<ModeToggle />
			</nav>
		</div>
	</div>
</header>
