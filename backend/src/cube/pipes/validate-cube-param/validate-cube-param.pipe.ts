import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateCubeParamPipe implements PipeTransform {
	transform(value: string) {
		return +value;
	}
}
