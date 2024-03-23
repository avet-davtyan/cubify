import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationOptions,
	registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'emailOrUsername', async: true })
@Injectable()
export class ExistsValidation implements ValidatorConstraintInterface {
	constructor(private prismaService: PrismaService) {}

	async validate(value: string): Promise<boolean> {
		let user = await this.prismaService.user.findFirst({
			where: {
				username: value,
			},
		});
		if (!user) {
			user = await this.prismaService.user.findFirst({
				where: {
					email: value,
				},
			});
			if (!user) {
				throw new UnauthorizedException('Unauthorized');
			}
		}
		return true;
	}
}

export function Exists(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'Exists',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: ExistsValidation,
		});
	};
}
