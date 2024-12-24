<script lang="ts">
	import PlusCircled from 'svelte-radix/PlusCircled.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MetaTags } from 'svelte-meta-tags';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';
	import ResourceList from '$lib/components/docs/ResourceList.svelte';

	const addURL = `https://github.com/errata-ai/vale.sh/tree/svelte?tab=readme-ov-file#packages--configurations`;
</script>

<MetaTags
	title="Package Explorer"
	description="The Package Explorer allows you to browse and install Vale packages and configurations."
	canonical="https://vale.sh"
	openGraph={{
		url: 'https://vale.sh',
		title: 'Vale: Your style, our editor',
		description:
			'Vale is a command-line tool that brings code-like linting to prose. Vale is cross-platform (Windows, macOS, and Linux), written in Go, and available on GitHub.',
		images: [
			{
				url: 'https://camo.githubusercontent.com/380138e374b8196f243f2621e74196ae92a7aba08bc3d2125bf09824238de1f7/68747470733a2f2f76616c652e73682f696d616765732f76616c652f6d61632e706e67',
				width: 800,
				height: 600,
				alt: 'Example Vale output'
			}
		]
	}}
/>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4 py-6 lg:px-8">
		<Tabs.Root value="music" class="h-full space-y-6">
			<div class="space-between flex items-center">
				<Tabs.List>
					<Tabs.Trigger value="music" class="relative">Packages</Tabs.Trigger>
					<Tabs.Trigger value="podcasts" disabled>Rules</Tabs.Trigger>
				</Tabs.List>
				<div class="ml-auto mr-4">
					<Button onclick={() => window.open(addURL, '_blank')}>
						<PlusCircled class="mr-2 h-4 w-4" />
						Add your own
					</Button>
				</div>
			</div>
			<Tabs.Content value="music" class="border-none p-0 outline-none">
				<div class="mx-auto max-w-7xl py-6">
					<ResourceList />
				</div>
			</Tabs.Content>
			<Tabs.Content
				value="podcasts"
				class="h-full flex-col border-none p-0 data-[state=active]:flex"
			>
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<h2 class="text-2xl font-semibold tracking-tight">New Episodes</h2>
						<p class="text-sm text-muted-foreground">Your favorite podcasts. Updated daily.</p>
					</div>
				</div>
				<Separator class="my-4" />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
