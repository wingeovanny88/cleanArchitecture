import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Item } from '../../domain/entities/item.entity';
import { IItemRepository } from '../../domain/repositories/item.repository';
import { KafkaProducerService } from '../../infrastructure/adapters/kafka/kafka.producer';
import { customLogger } from '../../commons/logger';
import { ItemService } from 'src/domain/services/item.service';

@Injectable()
export class CreateItemUseCase {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly kafkaProducer: KafkaProducerService,
    private readonly itemService: ItemService, // Inyectamos el servicio de dominio
  ) {}

  async execute(dto: CreateItemDto): Promise<Item> {
    const newItem = new Item(Date.now().toString(), dto.name, dto.description);

    // Validamos el item usando el servicio de dominio
    if (!this.itemService.validateItem(newItem)) {
      throw new Error('El item no es válido');
    }

    const createdItem = await this.itemRepository.create(newItem);

    await this.kafkaProducer.sendMessage('item-created', {
      id: createdItem.id,
      name: createdItem.name,
    });
    customLogger.log('Item creado y evento publicado', createdItem);
    return createdItem;
  }
}
