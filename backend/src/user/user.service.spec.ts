import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GoogleAccount, LocalAccount, User } from '@prisma/client';
import { UserAccountsIncluded } from 'src/auth/types/user.types';

const prismaMock = {
	localAccount: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
	},
	user: {
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
		prismaMock.user.findUnique.mockClear();
		prismaMock.user.findMany.mockClear();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findOne', () => {
		it('shoud return localAccount if exists', async () => {
			const localAccount = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
			};
			const mockUserAuthentication: UserAccountsIncluded = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				localAccount: {
					id: 'userid',
					email: 'email@gmail.com',
					fullName: 'Full Name',
					password: 'password',
				},
				googleAccount: null,
			};

			prismaMock.user.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOne('userid');
			expect(result).toEqual(localAccount);
			expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: {
					id: 'userid',
					verified: true,
				},
				include: { localAccount: true, googleAccount: true },
			});
		});

		it('shoud return googleAccount if exists', async () => {
			const googleAccount = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
				avatar: null,
				googleId: 'googleId',
			};
			const mockUserAuthentication: UserAccountsIncluded = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				localAccount: null,
				googleAccount: {
					id: 'userid',
					fullName: 'Full Name',
					email: 'email@gmail.com',
					googleId: 'googleId',
					avatar: null,
				},
			};

			prismaMock.user.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOne('userid');
			expect(result).toEqual(googleAccount);
			expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: {
					id: 'userid',
					verified: true,
				},
				include: { localAccount: true, googleAccount: true },
			});
		});

		it('should throw not found exception if user doesn not exist', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);

			await expect(service.findOne('nonExinstingId')).rejects.toThrow(NotFoundException);
		});
	});

	describe('findOneByUsername', () => {
		it('shoud return localAccount if exists', async () => {
			const localAccount = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
			};
			const mockUserAuthentication: UserAccountsIncluded = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				localAccount: {
					id: 'userid',
					email: 'email@gmail.com',
					fullName: 'Full Name',
					password: 'password',
				},
				googleAccount: null,
			};

			prismaMock.user.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOneByUsername('username');
			expect(result).toEqual(localAccount);
			expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: {
					username: 'username',
					verified: true,
				},
				include: { localAccount: true, googleAccount: true },
			});
		});

		it('shoud return googleAccount if exists', async () => {
			const googleAccount = {
				id: 'userid',
				email: 'email@gmail.com',
				fullName: 'Full Name',
				username: 'username',
				avatar: null,
				googleId: 'googleId',
			};
			const mockUserAuthentication: {
				localAccount: LocalAccount;
				googleAccount: GoogleAccount;
			} & User = {
				id: 'userid',
				username: 'username',
				verified: true,
				verificationToken: 'verificationToken',
				localAccount: null,
				googleAccount: {
					id: 'userid',
					fullName: 'Full Name',
					email: 'email@gmail.com',
					googleId: 'googleId',
					avatar: null,
				},
			};

			prismaMock.user.findUnique.mockResolvedValue(mockUserAuthentication);
			const result = await service.findOneByUsername('username');
			expect(result).toEqual(googleAccount);
			expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: {
					username: 'username',
					verified: true,
				},
				include: { localAccount: true, googleAccount: true },
			});
		});

		it('should throw not found exception if user doesn not exist', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);

			await expect(service.findOneByUsername('nonExinstingId')).rejects.toThrow(NotFoundException);
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
				{ localAccount: LocalAccount; googleAccount: GoogleAccount } & User
			> = [
				{
					id: 'userid',
					username: 'username',
					verified: true,
					verificationToken: 'verificationToken',
					localAccount: {
						id: 'userid',
						email: 'email@gmail.com',
						fullName: 'Full Name',
						password: 'password',
					},
					googleAccount: null,
				},
				{
					id: 'userid2',
					username: 'username2',
					verified: true,
					verificationToken: 'verificationToken2',
					localAccount: null,
					googleAccount: {
						id: 'userid2',
						fullName: 'Full Name',
						email: 'email2@gmail.com',
						googleId: 'googleId',
						avatar: null,
					},
				},
			];
			prismaMock.user.findMany.mockResolvedValue(resolvedValue);
			const result = await service.searchUsers('username', 1, 9);
			expect(result).toEqual(exptectation);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers('', 1, 9)).rejects.toThrow(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers(' ', 1, 9)).rejects.toThrow(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsers('.', 1, 9)).rejects.toThrow(BadRequestException);
		});
		it('should return an empty array if no user is found', async () => {
			prismaMock.user.findMany.mockResolvedValue([]);

			const result = await service.searchUsers('nonExisting', 1, 9);
			expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
			expect(result).toEqual([]);
		});
	});

	describe('searchUsersCount', () => {
		it('should return user count that include searchTerm in their names', async () => {
			const exptectation = 2;
			const resolvedValue = 2;
			prismaMock.user.count.mockResolvedValue(resolvedValue);
			const result = await service.searchUsersCount('username');
			expect(result).toEqual(exptectation);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount('')).rejects.toThrow(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount(' ')).rejects.toThrow(BadRequestException);
		});
		it('should throw bad request exception and because of the lack of provided search information', async () => {
			await expect(service.searchUsersCount('.')).rejects.toThrow(BadRequestException);
		});
	});
});
