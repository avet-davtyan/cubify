import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";

import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "emailOrUsername", async: true })
@Injectable()
export class IsUniqueValidation implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService) {}

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const { type }: { type: "username" | "email" } = args.constraints[0];
        let user;
        if (type === "username") {
            console.log(value);
            user = await this.prismaService.user.findFirst({
                where: {
                    username: value,
                },
            });
            if (user && !user?.verified) {
                await this.prismaService.$transaction(async (prisma) => {
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
                // await this.prismaService.user.delete({
                //     where: {
                //         id: user.id,
                //     },
                // });
                // await this.prismaService.user.delete({
                //     where: {
                //         id: user.id,
                //     },
                // });
                user = null;
            }
        } else if (type === "email") {
            user = await this.prismaService.localAccount.findFirst({
                where: {
                    email: value,
                },
                include: {
                    user: true,
                },
            });

            if (user && !user?.userAuth?.verified) {
                await this.prismaService.$transaction([
                    this.prismaService.localAccount.delete({
                        where: {
                            id: user.id,
                        },
                    }),
                    this.prismaService.user.delete({
                        where: {
                            id: user.id,
                        },
                    }),
                ]);

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
