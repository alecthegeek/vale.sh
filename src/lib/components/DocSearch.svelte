<script lang="ts">
	import '@docsearch/css';
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

<div id="docsearch"></div>
