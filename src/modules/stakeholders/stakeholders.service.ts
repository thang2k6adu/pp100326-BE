import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateStakeholderDto } from './dto/create-stakeholder.dto';
import { UpdateStakeholderDto } from './dto/update-stakeholder.dto';
import { QueryStakeholdersDto } from './dto/query-stakeholders.dto';
import { getPaginationOptions, paginate } from '@/common/utils/pagination.util';
import { PaginatedResponse } from '@/common/interfaces/api-response.interface';

@Injectable()
export class StakeholdersService {
  constructor(private prisma: PrismaService) {}

  async create(createStakeholderDto: CreateStakeholderDto) {
    const stakeholder = await this.prisma.stakeholder.create({
      data: createStakeholderDto,
    });
    return stakeholder;
  }

  async findAll(query: QueryStakeholdersDto): Promise<PaginatedResponse<any>> {
    const { skip, take, page, limit } = getPaginationOptions(query.page, query.limit);

    const where: any = {};

    if (query.projectId) {
      where.projectId = query.projectId;
    }

    if (query.classification) {
      where.classification = query.classification;
    }

    if (query.power) {
      where.power = query.power;
    }

    if (query.interest) {
      where.interest = query.interest;
    }

    if (query.influence) {
      where.influence = query.influence;
    }

    if (query.currentAttitude) {
      where.currentAttitude = query.currentAttitude;
    }

    if (query.desiredAttitude) {
      where.desiredAttitude = query.desiredAttitude;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' as const } },
        { positionRole: { contains: query.search, mode: 'insensitive' as const } },
      ];
    }

    const [stakeholders, total] = await Promise.all([
      this.prisma.stakeholder.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.stakeholder.count({ where }),
    ]);

    return paginate(stakeholders, total, page, limit);
  }

  async findOne(id: string) {
    const stakeholder = await this.prisma.stakeholder.findUnique({
      where: { id },
    });

    if (!stakeholder) {
      throw new NotFoundException('Stakeholder not found');
    }

    return stakeholder;
  }

  async update(id: string, updateStakeholderDto: UpdateStakeholderDto) {
    await this.findOne(id);

    const updatedStakeholder = await this.prisma.stakeholder.update({
      where: { id },
      data: updateStakeholderDto,
    });

    return updatedStakeholder;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.stakeholder.delete({
      where: { id },
    });

    return { message: 'Stakeholder deleted successfully' };
  }
}
