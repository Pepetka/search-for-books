export interface IVolumeInfo {
	title: string;
	subtitle?: string;
	description?: string;
	authors?: string[];
	imageLinks?: {
		thumbnail: string;
	};
	categories?: string[];
}

export interface IBook {
	id: string;
	volumeInfo: IVolumeInfo;
}
