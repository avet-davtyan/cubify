export class CreateCubeBodyDto {
	name: string;
	description?: string;
	backgroundColor?: string;
}

export class CreateCubeFilesDto {
	image1?: [File];
	image2?: [File];
	image3?: [File];
	image4?: [File];
	image5?: [File];
	image6?: [File];
}
