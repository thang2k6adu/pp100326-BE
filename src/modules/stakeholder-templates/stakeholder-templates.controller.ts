import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StakeholderTemplatesService } from './stakeholder-templates.service';
import { QueryStakeholderTemplatesDto } from './dto/query-stakeholder-templates.dto';
import { CreateStakeholderTemplateDto } from './dto/create-stakeholder-template.dto';
import { UpdateStakeholderTemplateDto } from './dto/update-stakeholder-template.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('stakeholder-templates')
@ApiBearerAuth()
@Controller('stakeholder-templates')
@UseGuards(JwtAuthGuard)
export class StakeholderTemplatesController {
  constructor(private readonly stakeholderTemplatesService: StakeholderTemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new template' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  create(@Body() createDto: CreateStakeholderTemplateDto) {
    return this.stakeholderTemplatesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stakeholder templates' })
  findAll(@Query() query: QueryStakeholderTemplatesDto) {
    return this.stakeholderTemplatesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template by ID' })
  findOne(@Param('id') id: string) {
    return this.stakeholderTemplatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update template by ID' })
  update(@Param('id') id: string, @Body() updateDto: UpdateStakeholderTemplateDto) {
    return this.stakeholderTemplatesService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete template by ID' })
  remove(@Param('id') id: string) {
    return this.stakeholderTemplatesService.remove(id);
  }
}
