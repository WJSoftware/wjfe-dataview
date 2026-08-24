<script lang="ts">
	import { fade } from 'svelte/transition';
	import { combineClasses } from '../utils.js';
	import zoomRatio from '../zoomRatio.js';

	let {
		minSize = 3,
		maxSize,
		resizeStart,
		resizeEnd,
		resize,
	}: {
		/**
		 * Minimum allowed final size, in em's.
		 */
		minSize?: number;
		/**
		 * Maximum allowed final size, in em's.  If not specified, then there is no maximum.
		 */
		maxSize?: number;
		resizeStart?: () => void;
		resizeEnd?: () => void;
		resize: (size: number | undefined) => void;
	} = $props();

	let dragStart = $state<number | null>(null);
	let delta = $state(0);
	let keyboardResizing = $state(false);
	let parentW = $state(0);
	let minSizePx = $state(0);
	let maxSizePx = $state<number | undefined>(undefined);
	let handle: HTMLDivElement;

	$effect(() => {
		if (dragStart === null) {
			delta = 0;
		}
	});

	const itemOverlayWidth = $derived(delta >= 0 ?
		parentW :
		Math.max(parentW + delta / $zoomRatio, minSizePx)
	);
	const deltaOverlayWidth = $derived(delta >= 0 ?
		(maxSizePx === undefined ? delta / $zoomRatio : Math.min(delta / $zoomRatio, maxSizePx - parentW)) :
		parentW - itemOverlayWidth
	);
	$effect(() => {
		minSizePx = convert(minSize, 'em', 'px')!;
		maxSizePx = convert(maxSize, 'em', 'px');
	});

	function handlePointerDown(e: PointerEvent) {
		e.preventDefault();
		e.stopPropagation();
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		dragStart = e.screenX;
		document.body.style.cursor = 'col-resize';
		resizeStart?.();
	}

	function handlePointerMove(e: PointerEvent) {
		if (dragStart !== null && !keyboardResizing) {
			e.preventDefault();
			delta = e.screenX - dragStart;
		}
	}

	function handlePointerUp(e?: PointerEvent) {
		if (dragStart === null) {
			return;
		}
		(e?.currentTarget as HTMLElement | null)?.releasePointerCapture(e?.pointerId ?? 0);
		dragStart = null;
		document.body.style.cursor = 'auto';
		resizeEnd?.();
		if (delta === 0) {
			return;
		}
		resize?.(convert(itemOverlayWidth + (delta < 0 ? 0 : deltaOverlayWidth), 'px', 'em'));
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && dragStart !== null) {
			cancelResize();
			e.preventDefault();
			return;
		}
		if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
			if (dragStart !== null) {
				handlePointerUp();
				keyboardResizing = false;
				delta = 0;
			}
			else {
				dragStart = 0;
				keyboardResizing = true;
				resizeStart?.();
			}
			e.preventDefault();
			return;
		}
		if (!e.shiftKey || (e.ctrlKey || e.altKey || e.metaKey)) {
			return;
		}
		const amount = 10;
		switch (e.key) {
			case 'ArrowLeft':
				delta -= amount;
				break;
			case 'ArrowRight':
				delta += amount;
				break;
			default:
				return;
		}
		e.preventDefault();
	}

	function cancelResize() {
		dragStart = null;
		keyboardResizing = false;
		document.body.style.cursor = 'auto';
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
			ruler.style.position = 'absolute';
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

{#if dragStart !== null}
	<div class="parent-overlay" transition:fade={{ duration: 170 }}>
		<div class="overlay item-overlay" style:width="{itemOverlayWidth}px"></div>
		<div
			class={combineClasses('overlay delta-overlay', { 'delta-neg': delta < 0, 'delta-pos': delta > 0 })}
			style:width="{deltaOverlayWidth}px"
		></div>
	</div>
{/if}
<div class="parent-template" bind:clientWidth={parentW}></div>
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="handle"
	bind:this={handle}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	role="separator"
	aria-valuenow={delta}
	tabindex="0"
	onkeydown={handleKeyDown}
	onblur={cancelResize}
>
	<!-- Needed to give width to the div... for some reason explicit CSS width doesn't work -->
	<svg viewBox="0 0 2 1" xmlns="http://www.w3.org/2000/svg">
	</svg>
</div>

<style lang="scss">
	div.handle {
		width: var(--wjdv-resizer-width, 0.3em);
		height: 100%;
		cursor: col-resize;
		margin-left: auto;
		touch-action: none;

		&::before {
			content: '';
			position: absolute;
			top: 10%;
			bottom: 10%;
			border-left: 0.15em solid currentColor;
			pointer-events: none;
		}
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
		height: 100%;
		box-sizing: border-box;
		z-index: 10;
	}

	div.overlay {
		box-sizing: border-box;
		opacity: var(--wjdv-resizer-overlay-opacity, 0.7);
		border-width: 0.15em;
		border-style: dashed;
	}

	div.item-overlay {
		box-sizing: border-box;
		height: 100%;
		background-color: var(--wjdv-resizer-overlay-bg-color, lightblue);
		border-color: var(--wjdv-resizer-overlay-border-color, blue);
	}

	div.delta-overlay {
		height: 100%;
	}

	div.delta-pos {
		background-color: var(--wjdv-resizer-deltapos-bg-color, lightgreen);
		border-color: var(--wjdv-resizer-deltapos-border-color, green);
	}

	div.delta-neg {
		background-color: var(--wjdv-resizer-deltaneg-bg-color, pink);
		border-color: var(--wjdv-resizer-deltaneg-border-color, red);
	}
</style>
