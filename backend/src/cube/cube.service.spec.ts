import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CubeService } from './cube.service';
import { Cube } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';

const prismaServiceMock = {
	cube: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
	},
	like: {
		findMany: jest.fn(),
	},
};

describe('CubeService', () => {
	let service: CubeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CubeService,
				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},
			],
		}).compile();

		service = module.get<CubeService>(CubeService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	describe('findOne', () => {
		it('should return cube', async () => {
			const cube: Cube = {
				id: 1,
				ownerId: 'ownerid',
				name: 'name',
				pending: false,
				description: 'description',
				backgroundColor: 'bgColor',
				side1: '1',
				side2: '2',
				side3: '3',
				side4: '4',
				side5: '5',
				side6: '6',
				createdAt: undefined,
			};
			prismaServiceMock.cube.findUnique.mockResolvedValue(cube);
			const resut = await service.findOne(1);
			expect(resut).toEqual(cube);
			expect(prismaServiceMock.cube.findUnique).toHaveBeenCalledTimes(1);
		});
		it('should throw not found exception', async () => {
			prismaServiceMock.cube.findUnique.mockResolvedValue(null);
			await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
		});
	});

	describe('getCubesWithMostLikes', () => {
		it('should return cubes with most likes', async () => {
			const cubesWithMostLikes: Cube[] = [
				{
					id: 1,
					ownerId: 'ownerid',
					name: 'name',
					pending: false,
					description: 'description',
					backgroundColor: 'bgColor',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
				{
					id: 2,
					ownerId: 'ownerid2',
					name: 'name2',
					pending: false,
					description: 'description2',
					backgroundColor: 'bgColor2',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
			];

			prismaServiceMock.cube.findMany.mockResolvedValue(cubesWithMostLikes);
			const result = await service.getCubesWithMostLikes();
			expect(result).toEqual(cubesWithMostLikes);
			expect(prismaServiceMock.cube.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getCubesMostRecentlyPublished', () => {
		it('should return recently published cubes', async () => {
			const cubesMostRecentlyPublished: Cube[] = [
				{
					id: 1,
					ownerId: 'ownerid',
					name: 'name',
					pending: false,
					description: 'description',
					backgroundColor: 'bgColor',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
				{
					id: 2,
					ownerId: 'ownerid2',
					name: 'name2',
					pending: false,
					description: 'description2',
					backgroundColor: 'bgColor2',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
			];

			prismaServiceMock.cube.findMany.mockResolvedValue(cubesMostRecentlyPublished);
			const result = await service.getCubesMostRecentlyPublished();
			expect(result).toEqual(cubesMostRecentlyPublished);
			expect(prismaServiceMock.cube.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getLikedCubes', () => {
		it('should return liked cubes', async () => {
			const likedCubes: Cube[] = [
				{
					id: 1,
					ownerId: 'ownerid',
					name: 'name',
					pending: false,
					description: 'description',
					backgroundColor: 'bgColor',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
				{
					id: 2,
					ownerId: 'ownerid2',
					name: 'name2',
					pending: false,
					description: 'description2',
					backgroundColor: 'bgColor2',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
			];
			const likes = [
				{
					cube: likedCubes[0],
				},
				{
					cube: likedCubes[1],
				},
			];
			const mockRequest: unknown = {
				payload: { id: 'userid' },
			};

			prismaServiceMock.like.findMany.mockResolvedValue(likes);
			const result = await service.getLikedCubes(mockRequest as Request);
			expect(result).toEqual(likedCubes);
		});
	});

	describe('getCubeByUser', () => {
		it('should return cubes of user', async () => {
			const userCubes: Cube[] = [
				{
					id: 1,
					ownerId: 'ownerid',
					name: 'name',
					pending: false,
					description: 'description',
					backgroundColor: 'bgColor',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
				{
					id: 2,
					ownerId: 'ownerid',
					name: 'name2',
					pending: false,
					description: 'description2',
					backgroundColor: 'bgColor2',
					side1: '1',
					side2: '2',
					side3: '3',
					side4: '4',
					side5: '5',
					side6: '6',
					createdAt: undefined,
				},
			];
			prismaServiceMock.cube.findMany.mockResolvedValue(userCubes);
			const result = await service.getCubesByUser('ownerid');
			expect(result).toEqual(userCubes);
			expect(prismaServiceMock.cube.findMany).toHaveBeenCalledTimes(1);
		});
	});
});
