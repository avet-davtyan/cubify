import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from 'src/mail/mail.service'; // Update the path as per your project structure
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: AuthService;

	const mockPrismaService = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService, MailService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockPrismaService)
			.compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('register', () => {
		it('should register a new user', async () => {
			const createUserDto: CreateUserDto = {
				username: 'avetdavtyan',
				email: 'avetdavtyan04@gmail.com',
				fullName: 'Avet Davtyan',
				password: '12345678',
			};
			jest.spyOn(authService, 'register').mockResolvedValue('someValue');
			expect(await controller.regitser(createUserDto)).toBe('someValue');
		});
	});

	// Add test cases for other controller methods as needed
});
