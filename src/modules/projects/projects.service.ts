import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { getPaginationOptions, paginate } from '@/common/utils/pagination.util';
import { PaginatedResponse } from '@/common/interfaces/api-response.interface';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return project;
  }

  async findAll(query: QueryProjectsDto, userId: string): Promise<PaginatedResponse<any>> {
    const { skip, take, page, limit } = getPaginationOptions(query.page, query.limit);

    const where: any = { userId }; // Only own projects

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' as const } },
        { description: { contains: query.search, mode: 'insensitive' as const } },
      ];
    }

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          description: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count({ where }),
    ]);

    return paginate(projects, total, page, limit);
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this project');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    await this.findOne(id, userId); // verify existence & ownership

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedProject;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // verify existence & ownership

    await this.prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  }
}
