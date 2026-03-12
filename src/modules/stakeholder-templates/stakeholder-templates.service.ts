import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { QueryStakeholderTemplatesDto } from './dto/query-stakeholder-templates.dto';
import { getPaginationOptions, paginate } from '@/common/utils/pagination.util';
import { PaginatedResponse } from '@/common/interfaces/api-response.interface';

@Injectable()
export class StakeholderTemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryStakeholderTemplatesDto): Promise<PaginatedResponse<any>> {
    const { skip, take, page, limit } = getPaginationOptions(query.page, query.limit);

    const where: any = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' as const } },
        { positionRole: { contains: query.search, mode: 'insensitive' as const } },
      ];
    }

    const [templates, total] = await Promise.all([
      this.prisma.stakeholderTemplate.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.stakeholderTemplate.count({ where }),
    ]);

    return paginate(templates, total, page, limit);
  }

  async findOne(id: string) {
    const template = await this.prisma.stakeholderTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new Error(`Stakeholder Template with ID ${id} not found`);
    }

    return template;
  }

  async create(createDto: any) {
    let score = createDto.score;
    if (score === undefined && createDto.power && createDto.interest) {
      const getVal = (level: string) => {
        if (level === 'High') return 3;
        if (level === 'Medium') return 2;
        if (level === 'Low') return 1;
        return 0;
      };
      score = getVal(createDto.power) * getVal(createDto.interest);
    }

    return this.prisma.stakeholderTemplate.create({
      data: {
        ...createDto,
        score,
      },
    });
  }

  async update(id: string, updateDto: any) {
    const existing = await this.findOne(id);

    let score = updateDto.score;
    const power = updateDto.power || existing.power;
    const interest = updateDto.interest || existing.interest;

    if (score === undefined && power && interest) {
      const getVal = (level: string) => {
        if (level === 'High') return 3;
        if (level === 'Medium') return 2;
        if (level === 'Low') return 1;
        return 0;
      };
      score = getVal(power) * getVal(interest);
    }

    return this.prisma.stakeholderTemplate.update({
      where: { id },
      data: {
        ...updateDto,
        score,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.stakeholderTemplate.delete({
      where: { id },
    });
  }
}
