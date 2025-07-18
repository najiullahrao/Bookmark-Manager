import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Post()
  async create(@Body() data: any) {
    return this.bookmarksService.createBookmark(data);
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    return this.bookmarksService.findAll(userId, Number(page) || 1, Number(perPage) || 10);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookmarksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.bookmarksService.updateBookmark(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookmarksService.deleteBookmark(id);
  }
}
