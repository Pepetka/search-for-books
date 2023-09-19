interface IVolumeInfo {
	title: string;
	subtitle?: string;
	description?: string;
	authors?: string[];
	imageLinks?: {
		thumbnail: string;
	};
	categories?: string[];
}

export interface Book {
	id: string;
	volumeInfo: IVolumeInfo;
}
