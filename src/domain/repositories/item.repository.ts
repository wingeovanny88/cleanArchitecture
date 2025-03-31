import { Item } from '../entities/item.entity';

export interface IItemRepository {
  create(item: Item): Promise<Item>;
  findById(id: string): Promise<Item | null>;
  update(item: Item): Promise<Item>;
  delete(id: string): Promise<void>;
}
