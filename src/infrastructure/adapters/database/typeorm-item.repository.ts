import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IItemRepository } from '../../../domain/repositories/item.repository';
import { Item } from '../../../domain/entities/item.entity';
import { ItemOrmEntity } from './item.orm.entity';

@Injectable()
export class TypeOrmItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
  ) {}

  async create(item: Item): Promise<Item> {
    const entity = this.repository.create({
      id: item.id,
      name: item.name,
      description: item.description,
    });
    await this.repository.save(entity);
    return item;
  }

  async findById(id: string): Promise<Item | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Item(entity.id, entity.name, entity.description);
  }

  async update(item: Item): Promise<Item> {
    await this.repository.update(item.id, {
      name: item.name,
      description: item.description,
    });
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
