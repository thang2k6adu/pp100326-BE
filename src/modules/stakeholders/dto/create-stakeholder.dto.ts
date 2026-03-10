import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsEnum,
  IsUUID,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Classification, Level, Attitude } from '@prisma/client';

export class CreateStakeholderDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  positionRole?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  contactInformation?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  expectations?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phaseOfMostImpact?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  group?: string;

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

  @ApiProperty({ example: 15, required: false })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  score?: number;
}
