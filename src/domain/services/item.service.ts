import { Item } from '../entities/item.entity';

export class ItemService {
  // Aquí podrías agregar reglas o validaciones de negocio
  validateItem(item: Item): boolean {
    return item.name.trim().length > 0;
  }
}
