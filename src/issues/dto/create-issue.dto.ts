import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsInt()
  @Min(1)
  @Max(3)
  readonly state: number;
}
