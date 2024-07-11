import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PasswordConfig } from "../types/passwordConfig.types";
import * as bcrypt from "bcrypt";

@Injectable()
export class PassService {
    private passwordConfig: PasswordConfig;
    constructor() {
        this.passwordConfig = {
            salt: 10,
        };
    }

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.passwordConfig.salt);
    }

    async compare(password, hashedPassword): Promise<boolean> {
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST);
        }
        return match;
    }
}
