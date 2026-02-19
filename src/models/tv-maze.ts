type TVMazeItem = {
	id: number;
	name: string;
	genres: string[];
}

type TVMazeSearchItem = {
	score: number;
	show: TVMazeItem;
}

type TVMazeGenreCluster = Record<string, TVMazeItem[]>;

export { TVMazeItem, TVMazeSearchItem, TVMazeGenreCluster };
