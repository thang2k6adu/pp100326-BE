import { Module } from '@nestjs/common';
import { StakeholdersService } from './stakeholders.service';
import { StakeholdersController } from './stakeholders.controller';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [StakeholdersController],
  providers: [StakeholdersService, PrismaService],
  exports: [StakeholdersService],
})
export class StakeholdersModule {}
