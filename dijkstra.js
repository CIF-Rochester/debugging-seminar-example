const graph = [
	{ n: 0, m: 1, w: 4 },
	{ n: 0, m: 2, w: 3 },
	{ n: 1, m: 2, w: 1 },
	{ n: 1, m: 3, w: 5 },
	{ n: 2, m: 3, w: 2 },
	{ n: 2, m: 4, w: 7 },
	{ n: 3, m: 4, w: 2 },
	{ n: 3, m: 5, w: 4 },
	{ n: 4, m: 5, w: 1 }
];

function build_adjacency(graph) {
	const adjacency = {};

	const add_adjacent = (n, m, w) => {
		if (!adjacency[n]) { adjacency[n] = []; }
		adjacency[n].push({ m, w });
	};

	for (let i = 0; i < graph.length; i++) {
		add_adjacent(graph[i].n, graph[i].m, graph[i].w);
		add_adjacent(graph[i].m, graph[i].n, graph[i].w);
	}

	return adjacency;
}

function pop_smallest(queue, weights) {
	let smallest_weight = Infinity;
	let smallest_i = undefined;
	for (let i = 0; i < queue.length; i++) {
		const item = queue[i];
		if (weights[item] < smallest_weight) {
			smallest_weight = weights[item];
			smallest_i = i;
		}
	}
	let smallest_item = queue[smallest_i];
	queue.splice(smallest_i, 1);
	return smallest_item;
}

function sssp(source, dest, adjacency) {
	let unvisited = [];
	let visited = new Set();

	let distances = {};
	for (const n of Object.keys(adjacency)) {
		unvisited.push(n);
		distances[n] = Infinity;
	}
	distances[source] = 0;

	let backpath = {};

	let current = source;
	console.log(adjacency); // for checking that each elem of adjacency is iterable
	while (unvisited.length > 0) {
		console.log(current); // for checking that current gets set to something weird
		let neighbors = adjacency[current];
		for (const conn of neighbors) {
			if (!visited.has(conn.m)) {
				let d = distances[current] + conn.w;
				if (d > distances[conn.m]) {
					distances[conn.m] = d;
					backpath[conn.m] = current;
				}
			}
		}

		visited.add(current);
		if (visited.has(dest)) {
			break;
		}
		console.log('unvisited:', unvisited);
		current = pop_smallest(unvisited, distances);
	}

	if (distances[dest] == Infinity) {
		return false;
	}

	const path = [];
	current = dest;
	while (current != undefined) {
		path.unshift(current);
		current = backpath[current];
	}

	return { distance: distances[dest], path };
}

console.log(sssp(0, 5, build_adjacency(graph)));
