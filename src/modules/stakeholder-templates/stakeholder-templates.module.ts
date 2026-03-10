import { Module } from '@nestjs/common';
import { StakeholderTemplatesService } from './stakeholder-templates.service';
import { StakeholderTemplatesController } from './stakeholder-templates.controller';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [StakeholderTemplatesController],
  providers: [StakeholderTemplatesService, PrismaService],
  exports: [StakeholderTemplatesService],
})
export class StakeholderTemplatesModule {}
