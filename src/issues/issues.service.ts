import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issuesRepository: Repository<Issue>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.issuesRepository.find({ skip: offset, take: limit });
  }

  async findOne(id: number) {
    const issue = await this.issuesRepository.findOneBy({ id: id });

    if (!issue) throw new NotFoundException(`Issue #${id} not found`);
    return issue;
  }

  async create(createIssueDto: CreateIssueDto) {
    const issue = this.issuesRepository.create(createIssueDto);
    return this.issuesRepository.save(issue);
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    const existingIssue = await this.issuesRepository.findOneBy({ id: id });

    if (!existingIssue) throw new NotFoundException(`Issue #${id} not found`);

    if (updateIssueDto.state && updateIssueDto.state < existingIssue.state) {
      throw new BadRequestException(
        `The issue state cannot be set back to the previous state. Current state: ${existingIssue.state}`,
      );
    }

    return this.issuesRepository.save({
      ...existingIssue,
      ...updateIssueDto,
    });
  }

  async remove(id: number) {
    const issue = await this.issuesRepository.findOne({ where: { id: id } });

    if (!issue) throw new NotFoundException(`Issue #${id} not found`);
    return this.issuesRepository.remove(issue);
  }
}
