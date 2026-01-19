<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	{@render children()}
</div>
<Toaster richColors />
