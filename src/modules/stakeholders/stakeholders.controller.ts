import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StakeholdersService } from './stakeholders.service';
import { CreateStakeholderDto } from './dto/create-stakeholder.dto';
import { UpdateStakeholderDto } from './dto/update-stakeholder.dto';
import { QueryStakeholdersDto } from './dto/query-stakeholders.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('stakeholders')
@ApiBearerAuth()
@Controller('stakeholders')
@UseGuards(JwtAuthGuard)
export class StakeholdersController {
  constructor(private readonly stakeholdersService: StakeholdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stakeholder' })
  @ApiResponse({ status: 201, description: 'Stakeholder created successfully' })
  create(@Body() createStakeholderDto: CreateStakeholderDto) {
    return this.stakeholdersService.create(createStakeholderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stakeholders' })
  findAll(@Query() query: QueryStakeholdersDto) {
    return this.stakeholdersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stakeholder by ID' })
  findOne(@Param('id') id: string) {
    return this.stakeholdersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update stakeholder by ID' })
  update(@Param('id') id: string, @Body() updateStakeholderDto: UpdateStakeholderDto) {
    return this.stakeholdersService.update(id, updateStakeholderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete stakeholder by ID' })
  remove(@Param('id') id: string) {
    return this.stakeholdersService.remove(id);
  }
}
