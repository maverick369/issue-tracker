import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit: number = 100;

  @IsOptional()
  @IsPositive()
  offset: number;
}
