import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CubeService } from './cube.service';

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

describe('CubeService', () => {
	let service: CubeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CubeService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
			],
		}).compile();

		service = module.get<CubeService>(CubeService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
