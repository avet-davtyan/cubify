import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationOptions,
	registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'emailOrUsername', async: true })
@Injectable()
export class IsUniqueValidation implements ValidatorConstraintInterface {
	constructor(private prismaService: PrismaService) {}

	async validate(value: string, args: ValidationArguments): Promise<boolean> {
		const { type }: { type: 'username' | 'email' } = args.constraints[0];
		const searchPayLoad = type === 'username' ? { username: value } : { email: value };
		const user = await this.prismaService.user.findFirst({ where: searchPayLoad });
		if (user) {
			throw new UnprocessableEntityException(`${type} already exists`);
		} else {
			return true;
		}
	}
}

export function IsUnique(
	options: { type: 'username' | 'email' },
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isUnique',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [options],
			validator: IsUniqueValidation,
		});
	};
}
