type TVMazeItem = {
	genres: string[];
	id: number;
	image: {
		medium: string;
		original: string;
	} | null;
	language: string;
	name: string;
	network: {
		name: string;
		country: {
			name: string;
		};
	} | null;
	premiered: string;
	rating: {
		average: number | null;
	};
	summary: string;
}

type TVMazeSearchItem = {
	score: number;
	show: TVMazeItem;
}

type TVMazeGenreCluster = Record<string, TVMazeItem[]>;

export { TVMazeItem, TVMazeSearchItem, TVMazeGenreCluster };
