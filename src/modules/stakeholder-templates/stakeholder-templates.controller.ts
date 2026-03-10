import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StakeholderTemplatesService } from './stakeholder-templates.service';
import { QueryStakeholderTemplatesDto } from './dto/query-stakeholder-templates.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('stakeholder-templates')
@ApiBearerAuth()
@Controller('stakeholder-templates')
@UseGuards(JwtAuthGuard)
export class StakeholderTemplatesController {
  constructor(private readonly stakeholderTemplatesService: StakeholderTemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stakeholder templates' })
  findAll(@Query() query: QueryStakeholderTemplatesDto) {
    return this.stakeholderTemplatesService.findAll(query);
  }
}
