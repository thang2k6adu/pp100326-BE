import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Classification, Level, Attitude } from '@prisma/client';

export class QueryStakeholdersDto {
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({ example: 'stakeholder name', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: '123-uuid', required: false })
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @ApiProperty({ enum: Classification, required: false })
  @IsEnum(Classification)
  @IsOptional()
  classification?: Classification;

  @ApiProperty({ enum: Level, required: false })
  @IsEnum(Level)
  @IsOptional()
  power?: Level;

  @ApiProperty({ enum: Level, required: false })
  @IsEnum(Level)
  @IsOptional()
  interest?: Level;

  @ApiProperty({ enum: Level, required: false })
  @IsEnum(Level)
  @IsOptional()
  influence?: Level;

  @ApiProperty({ enum: Attitude, required: false })
  @IsEnum(Attitude)
  @IsOptional()
  currentAttitude?: Attitude;

  @ApiProperty({ enum: Attitude, required: false })
  @IsEnum(Attitude)
  @IsOptional()
  desiredAttitude?: Attitude;
}
