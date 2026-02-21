enum LoadingTypes {
	GENRE_CLUSTER = "GenreCluster",
	SEARCH = "Search"
}

enum LoadingStatuses {
	INACTIVE = 0,
	ACTIVE = 1,
	ERROR = 2
}

type LoadingProcess = {
	status: LoadingStatuses;
	errorMessage: string
}

type LoadingCluster = Record<string, LoadingProcess>;

export { LoadingCluster, LoadingStatuses, LoadingProcess, LoadingTypes };