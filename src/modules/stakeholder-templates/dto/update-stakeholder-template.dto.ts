import { PartialType } from '@nestjs/swagger';
import { CreateStakeholderTemplateDto } from './create-stakeholder-template.dto';

export class UpdateStakeholderTemplateDto extends PartialType(CreateStakeholderTemplateDto) {}
