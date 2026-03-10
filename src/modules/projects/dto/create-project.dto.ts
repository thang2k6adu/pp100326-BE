import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'My New Project' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'A project description', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
