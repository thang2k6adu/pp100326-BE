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
}
