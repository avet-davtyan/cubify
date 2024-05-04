import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { GoogleUser, User, UserAuthentication } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const prismaMock = {
	user: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
	},
	userAuthentication: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
		count: jest.fn(),
	},
};

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		prismaMock.userAuthentication.findUnique.mockClear();
		prismaMock.userAuthentication.findMany.mockClear();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findOne', () => {
		it('shoud return simpleUser if exists', async () => {
			const simpleUser = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
			};
			const mockUserAuthentication: {
				simpleUser: User;
				googleUser: GoogleUser;
			} & UserAuthentication = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				simpleUser: {
					id: 'userid',
					email: 'email@gmail.com',
					fullName: 'Full Name',
					password: 'password',
				},
				googleUser: null,
			};

			prismaMock.userAuthentication.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOne('userid');
			expect(result).toEqual(simpleUser);
			expect(prismaMock.userAuthentication.findUnique).toBeCalledTimes(1);
			expect(prismaMock.userAuthentication.findUnique).toHaveBeenCalledWith({
				where: {
					id: 'userid',
					verified: true,
				},
				include: { simpleUser: true, googleUser: true },
			});
		});

		it('shoud return googleUser if exists', async () => {
			const googleUser = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
				avatar: null,
				googleId: 'googleId',
			};
			const mockUserAuthentication: {
				simpleUser: User;
				googleUser: GoogleUser;
			} & UserAuthentication = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				simpleUser: null,
				googleUser: {
					id: 'userid',
					fullName: 'Full Name',
					email: 'email@gmail.com',
					googleId: 'googleId',
					avatar: null,
				},
			};

			prismaMock.userAuthentication.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOne('userid');
			expect(result).toEqual(googleUser);
			expect(prismaMock.userAuthentication.findUnique).toBeCalledTimes(1);
			expect(prismaMock.userAuthentication.findUnique).toHaveBeenCalledWith({
				where: {
					id: 'userid',
					verified: true,
				},
				include: { simpleUser: true, googleUser: true },
			});
		});

		it('should throw not found exception if user doesn not exist', async () => {
			prismaMock.userAuthentication.findUnique.mockResolvedValue(null);

			await expect(service.findOne('nonExinstingId')).rejects.toThrowError(NotFoundException);
		});
	});

	describe('findOneByUsername', () => {
		it('shoud return simpleUser if exists', async () => {
			const simpleUser = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
			};
			const mockUserAuthentication: {
				simpleUser: User;
				googleUser: GoogleUser;
			} & UserAuthentication = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				simpleUser: {
					id: 'userid',
					email: 'email@gmail.com',
					fullName: 'Full Name',
					password: 'password',
				},
				googleUser: null,
			};

			prismaMock.userAuthentication.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOneByUsername('username');
			expect(result).toEqual(simpleUser);
			expect(prismaMock.userAuthentication.findUnique).toBeCalledTimes(1);
			expect(prismaMock.userAuthentication.findUnique).toHaveBeenCalledWith({
				where: {
					username: 'username',
					verified: true,
				},
				include: { simpleUser: true, googleUser: true },
			});
		});

		it('shoud return googleUser if exists', async () => {
			const googleUser = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
				avatar: null,
				googleId: 'googleId',
			};
			const mockUserAuthentication: {
				simpleUser: User;
				googleUser: GoogleUser;
			} & UserAuthentication = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				simpleUser: null,
				googleUser: {
					id: 'userid',
					fullName: 'Full Name',
					email: 'email@gmail.com',
					googleId: 'googleId',
					avatar: null,
				},
			};

			prismaMock.userAuthentication.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOneByUsername('username');
			expect(result).toEqual(googleUser);
			expect(prismaMock.userAuthentication.findUnique).toBeCalledTimes(1);
			expect(prismaMock.userAuthentication.findUnique).toHaveBeenCalledWith({
				where: {
					username: 'username',
					verified: true,
				},
				include: { simpleUser: true, googleUser: true },
			});
		});

		it('should throw not found exception if user doesn not exist', async () => {
			prismaMock.userAuthentication.findUnique.mockResolvedValue(null);

			await expect(service.findOneByUsername('nonExinstingId')).rejects.toThrowError(
				NotFoundException,
			);
		});
	});

	describe('searchUsers', () => {
		it('should return users that include searchTerm in their names', async () => {
			const exptectation = [
				{
					id: 'userid',
					username: 'username',
					email: 'email@gmail.com',
					fullName: 'Full Name',
				},
				{
					id: 'userid2',
					username: 'username2',
					fullName: 'Full Name',
					email: 'email2@gmail.com',
					googleId: 'googleId',
					avatar: null,
				},
			];
			const resolvedValue: Array<
				{ simpleUser: User; googleUser: GoogleUser } & UserAuthentication
			> = [
				{
					id: 'userid',
					username: 'username',
					verified: true,
					verificationToken: 'verificationToken',
					simpleUser: {
						id: 'userid',
						email: 'email@gmail.com',
						fullName: 'Full Name',
						password: 'password',
					},
					googleUser: null,
				},
				{
					id: 'userid2',
					username: 'username2',
					verified: true,
					verificationToken: 'verificationToken2',
					simpleUser: null,
					googleUser: {
						id: 'userid2',
						fullName: 'Full Name',
						email: 'email2@gmail.com',
						googleId: 'googleId',
						avatar: null,
					},
				},
			];
			prismaMock.userAuthentication.findMany.mockResolvedValue(resolvedValue);
			const result = await service.searchUsers('username', 1, 9);
			expect(result).toEqual(exptectation);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers('', 1, 9)).rejects.toThrowError(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers(' ', 1, 9)).rejects.toThrowError(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers('.', 1, 9)).rejects.toThrowError(BadRequestException);
		});
		it('should return an empty array if no user is found', async () => {
			prismaMock.userAuthentication.findMany.mockResolvedValue([]);

			const result = await service.searchUsers('nonExisting', 1, 9);
			expect(prismaMock.userAuthentication.findMany).toBeCalledTimes(1);
			expect(result).toEqual([]);
		});
	});

	describe('searchUsersCount', () => {
		it('should return user count that include searchTerm in their names', async () => {
			const exptectation = 2;
			const resolvedValue = 2;
			prismaMock.userAuthentication.count.mockResolvedValue(resolvedValue);
			const result = await service.searchUsersCount('username');
			expect(result).toEqual(exptectation);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount('')).rejects.toThrowError(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount(' ')).rejects.toThrowError(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount('.')).rejects.toThrowError(BadRequestException);
		});
	});
});
