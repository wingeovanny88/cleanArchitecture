import { Controller, Post, Body } from '@nestjs/common';
import { CreateItemUseCase } from '../../application/use-cases/create-item.use-case';
import { CreateItemDto } from '../../application/dtos/create-item.dto';
import { Item } from '../../domain/entities/item.entity';

@Controller('items')
export class ItemController {
  constructor(private readonly createItemUseCase: CreateItemUseCase) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.createItemUseCase.execute(createItemDto);
  }
}
