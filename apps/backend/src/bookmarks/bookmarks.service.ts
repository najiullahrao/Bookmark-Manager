import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(data: any) {
    return this.prisma.bookmark.create({
      data,
    });
  }

  async findAll(userId: string, page = 1, perPage = 10) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findOne(id: string) {
    return this.prisma.bookmark.findUnique({
      where: { id },
    });
  }

  async updateBookmark(id: string, data: any) {
    return this.prisma.bookmark.update({
      where: { id },
      data,
    });
  }

  async deleteBookmark(id: string) {
    return this.prisma.bookmark.delete({
      where: { id },
    });
  }
}
