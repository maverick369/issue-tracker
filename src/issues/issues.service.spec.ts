import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuesService } from './issues.service';
import { Issue } from './entities/issue.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
});

describe('IssuesService', () => {
  let service: IssuesService;
  let issuesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuesService,
        {
          provide: getRepositoryToken(Issue),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<IssuesService>(IssuesService);
    issuesRepository = module.get<MockRepository>(getRepositoryToken(Issue));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when issue with ID exists', () => {
      it('should return the issue object', async () => {
        const issueId = 1;
        const expectedIssue = { title: 'Test Issue' };

        issuesRepository.findOneBy.mockReturnValue(expectedIssue);
        const issue = await service.findOne(issueId);
        expect(issue).toEqual(expectedIssue);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const issueId = 1;
        issuesRepository.findOneBy.mockReturnValue(undefined);

        try {
          await service.findOne(issueId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Issue #${issueId} not found`);
        }
      });
    });
  });
});
