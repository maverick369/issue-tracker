import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssuesController {
    constructor(private readonly issuesService: IssuesService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.issuesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.issuesService.findOne(id);
    }

    @Post()
    create(@Body() createIssueDto: CreateIssueDto) {
        return this.issuesService.create(createIssueDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateIssueDto: UpdateIssueDto,
    ) {
        return this.issuesService.update(id, updateIssueDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.issuesService.remove(id);
    }
}
