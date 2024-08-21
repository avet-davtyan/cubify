import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";

import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator,
} from "class-validator";
import { LocalAccount, User } from "@prisma/client";

@ValidatorConstraint({ name: "emailOrUsername", async: true })
@Injectable()
export class IsUniqueValidation implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService) {}

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const { type }: { type: "username" | "email" } = args.constraints[0];
        let user: User | null;
        if (type === "username") {
            user = await this.prismaService.user.findFirst({
                where: {
                    username: value,
                },
            });
            if (user && !user.verified) {
                await this.prismaService.$transaction(async (prisma) => {
                    await prisma.like.deleteMany({
                        where: {
                            userId: user.id,
                        },
                    });
                    await prisma.cube.deleteMany({
                        where: {
                            ownerId: user.id,
                        },
                    });
                    await prisma.localAccount.delete({
                        where: {
                            id: user.id,
                        },
                    });
                    await prisma.user.delete({
                        where: {
                            id: user.id,
                        },
                    });
                });
                user = null;
            }
        } else if (type === "email") {
            const localAccount = await this.prismaService.localAccount.findFirst({
                where: {
                    email: value,
                },
                include: {
                    user: true,
                },
            });
            user = localAccount?.user;

            if (user && !user.verified) {
                await this.prismaService.$transaction(async (prisma) => {
                    await prisma.like.deleteMany({
                        where: {
                            userId: user.id,
                        },
                    });
                    await prisma.cube.deleteMany({
                        where: {
                            ownerId: user.id,
                        },
                    });
                    await prisma.localAccount.delete({
                        where: {
                            id: user.id,
                        },
                    });
                    await prisma.user.delete({
                        where: {
                            id: user.id,
                        },
                    });
                });
                user = null;
            }
        }

        if (user) {
            throw new UnprocessableEntityException(`${type} already exists`);
        } else {
            return true;
        }
    }
}

export function IsUnique(options: { type: "username" | "email" }, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isUnique",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueValidation,
        });
    };
}
