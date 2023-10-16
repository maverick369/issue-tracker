import { IsInt, IsString, Max, Min } from 'class-validator';
import { IssueState } from '../enums/issue-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIssueDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @ApiProperty(   { enum: IssueState, description: '1 - Open; Pending - 2; Closed - 3;' })
  @IsInt()
  @Min(1)
  @Max(3)
  readonly state: IssueState;
}
