<script lang="ts">
    import zoomRatio from '$lib/stores/zoomRatio.js';
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { combineClasses } from '$lib/utils/helpers.js';

	// Props.
	/**
	 * Minimum allowed final size, in em's.
	 */
	export let minSize = 1;
	/**
	 * Maximum allowed final size, in em's.  If not specified, then there is no maximum.
	 */
	export let maxSize: number | undefined = undefined;

	const dispatch = createEventDispatcher();
	let dragStart: number | null = null;
	let delta = 0;
	let parentW: number;
	let parentH: number;
	let minSizePx: number;
	let maxSizePx: number | undefined;
	let handle: HTMLDivElement;
	$: if (dragStart === null) {
		delta = 0;
	}
	let itemOverlayWidth: number;
	let deltaOverlayWidth: number;
	$: if (delta >= 0) {
		itemOverlayWidth = parentW;
		deltaOverlayWidth = maxSizePx === undefined ? delta / $zoomRatio : Math.min(delta / $zoomRatio, maxSizePx - parentW);
	}
	else {
		itemOverlayWidth = Math.max(parentW + delta / $zoomRatio, minSizePx);
		deltaOverlayWidth = parentW - itemOverlayWidth;
	}
	onMount(() => {
		minSizePx = convert(minSize, 'em', 'px')!;
		maxSizePx = convert(maxSize, 'em', 'px');
	});

	function handleMouseDown(e: MouseEvent) {
		dragStart = e.screenX;
		document.body.style.cursor = 'col-resize';
		dispatch('resizeStart');
	}

	function handleMouseMove(e: MouseEvent) {
		if (dragStart !== null) {
			delta = e.screenX - dragStart;
		}
	}

	function handleMouseUp(e: MouseEvent) {
		if (dragStart === null) {
			return;
		}
		dragStart = null;
		document.body.style.cursor = 'auto';
		dispatch('resizeEnd');
		if (delta === 0) {
			return;
		}
		dispatch('resize', convert(itemOverlayWidth + (delta < 0 ? 0 : deltaOverlayWidth), 'px', 'em'));
	}

	function convert(value: number | undefined, fromUnit: string, toUnit: string) {
		if (value === undefined || !handle) {
			return undefined;
		}
		if (fromUnit === toUnit) {
			return value;
		}
		const measure = (v: number, u: string) => {
			const ruler = document.createElement('div');
			ruler.style.height = '1px';
			ruler.style.position ='absolute';
			ruler.style.width = `${v}${u}`;
			handle?.parentNode?.appendChild(ruler);
			const r = getComputedStyle(ruler).width;
			handle?.parentNode?.removeChild(ruler);
			return +`${r.substring(0, r.length - 2)}`;
		};
		let result = value;
		if (fromUnit !== 'px') {
			result = measure(value, fromUnit);
		}
		if (toUnit === 'px') {
			return result;
		}
		const cf = measure(1, toUnit);
		return result / cf;
	}
</script>

<svelte:document on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

{#if dragStart !== null}
	<div class="parent-overlay" style:height={`${parentH}px`} transition:fade={{ duration: 170 }}>
		<div class="overlay item-overlay" style:width={`${itemOverlayWidth}px`}>
		</div>
		<div
			class={combineClasses("overlay delta-overlay", { 'delta-neg': delta < 0, 'delta-pos': delta > 0 })}
			style:width={`${deltaOverlayWidth}px`}>
		</div>
	</div>
{/if}
<div class="parent-template" bind:clientWidth={parentW} bind:clientHeight={parentH}>
</div>
<div
	class="handle"
	bind:this={handle}
	on:mousedown|stopPropagation|preventDefault={handleMouseDown}
	style:height={`${parentH}px`}
	role="separator"
	aria-valuenow={delta}
	on:keydown={() => {}}
>
</div>

<style>
	div.handle {
		width: 0.3em;
		cursor: col-resize;
		margin-left: auto;
		background-color: rgba(0,0,0,0.05);
	}
	
	div.parent-template {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	div.parent-overlay {
		display: flex;
		flex-flow: row;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		z-index: 10;
	}

	div.overlay {
		box-sizing: border-box;
		opacity: 80%;
		border-width: 0.15em;
		border-style: dashed;
	}

	div.item-overlay {
		box-sizing: border-box;
		height: 100%;
		background-color: lightblue;
		border-color: blue;
	}

	div.delta-overlay {
		height: 100%;
	}

	div.delta-pos {
		background-color: lightgreen;
		border-color: green;
	}

	div.delta-neg {
		background-color: pink;
		border-color: red;
	}
</style>