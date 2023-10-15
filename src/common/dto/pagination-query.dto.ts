import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ required: false, maximum: 100 })
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit: number = 100;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  offset: number;
}
