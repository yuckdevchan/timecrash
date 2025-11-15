<script lang="ts">
	import { onMount } from 'svelte';
	export let containerSelector: string = '.markdown-body';
	let toc: TocEntry[] = [];
	let activeId: string = '';

	type TocEntry = {
		id: string;
		text: string;
		level: number;
		children?: TocEntry[];
	};

	function scrollToHeading(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', '#' + id);
		}
	}

	// Parse headings and build a tree
	function buildTocTree(headings: { id: string; text: string; level: number }[]): TocEntry[] {
		const tree: TocEntry[] = [];
		let lastH1: TocEntry | null = null;
		let hasH1 = headings.some((h) => h.level === 1);
		for (const h of headings) {
			if (h.level === 1) {
				lastH1 = { ...h, children: [] };
				tree.push(lastH1);
			} else if (h.level === 2 && lastH1) {
				lastH1.children!.push({ ...h });
			} else if (h.level === 2 && !hasH1) {
				// No h1s at all, treat h2 as root
				tree.push({ ...h });
			} else if (h.level === 1) {
				// orphan h1
				tree.push({ ...h, children: [] });
			}
		}
		return tree;
	}

	onMount(() => {
		// Wait for DOM to be ready
		setTimeout(() => {
			const container = document.querySelector(containerSelector);
			if (!container) return;
			const headings = Array.from(container.querySelectorAll('h1, h2')) as HTMLHeadingElement[];
			const flat = headings.map((h) => {
				let id = h.id;
				if (!id) {
					id = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
					h.id = id;
				}
				return { id, text: h.textContent || '', level: parseInt(h.tagName[1]) };
			});
			toc = buildTocTree(flat);

			// Scroll spy
			const onScroll = () => {
				let current = '';
				for (const h of headings) {
					const el = document.getElementById(h.id);
					if (el && el.getBoundingClientRect().top < 120) {
						current = h.id;
					}
				}
				activeId = current;
			};
			window.addEventListener('scroll', onScroll);
			onScroll();
			// Clean up
			return () => window.removeEventListener('scroll', onScroll);
		}, 0);
	});
</script>

<nav class="toc">
	<div class="toc-row">
		<span class="toc-title">Contents</span>
		<ul>
			{#each toc as entry}
				<li class="toc-item level-1 {activeId === entry.id ? 'active' : ''}">
					<a href={'#' + entry.id} on:click|preventDefault={() => scrollToHeading(entry.id)}
						>{entry.text}</a
					>
					{#if entry.children && entry.children.length}
						<ul>
							{#each entry.children as child}
								<li class="toc-item level-2 {activeId === child.id ? 'active' : ''}">
									<a href={'#' + child.id} on:click|preventDefault={() => scrollToHeading(child.id)}
										>{child.text}</a
									>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.toc {
		position: sticky;
		top: 2em;
		min-width: 180px;
		max-width: 220px;
		background: none;
		padding: 1.2em 0.5em 1.2em 1.2em;
		font-size: 0.98em;
		border-left: 2.5px solid #e0e0e0;
		height: fit-content;
		box-shadow: -2px 0 6px 0 rgba(0, 0, 0, 0.03);
		margin-left: 3rem;
	}
	.toc-row {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2em;
	}
	.toc-title {
		font-weight: bold;
		margin-bottom: 0.2em;
		font-size: 1em;
		color: #444;
	}
	.toc ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.toc-item {
		margin-bottom: 0.3em;
		transition: background 0.2s;
		padding: 0.2em 0.2em 0.2em 0.4em;
		border-radius: 3px;
	}
	.toc-item a {
		padding: 0.2rem 0 0.2rem 0.6rem;
		color: #888;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.15s;
		display: block;
	}
	.toc-item a:hover {
		color: #444;
		background: #f5f5f5;
	}
	.toc-item.active > a {
		color: #181818;
		font-weight: 700;
		background: #eaeaea;
		text-decoration: none;
	}
	.toc-item.level-2 {
		margin-left: 1em;
	}
	@media (max-width: 900px) {
		.toc {
			position: static;
			border-left: none;
			border-bottom: 2px solid #eee;
			margin-bottom: 1em;
			max-width: 100vw;
			width: 100%;
			padding: 0.5em 0;
		}
	}
</style>
