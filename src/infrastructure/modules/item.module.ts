import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrmEntity } from '../adapters/database/item.orm.entity';
import { ItemController } from '../controllers/item.controller';
import { TypeOrmItemRepository } from '../adapters/database/typeorm-item.repository';
import { CreateItemUseCase } from '../../application/use-cases/create-item.use-case';
import { KafkaProducerService } from '../adapters/kafka/kafka.producer';
import { ItemService } from '../../domain/services/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemOrmEntity])],
  controllers: [ItemController],
  providers: [
    {
      provide: 'IItemRepository',
      useClass: TypeOrmItemRepository,
    },
    ItemService,
    KafkaProducerService,
    {
      provide: CreateItemUseCase,
      useFactory: (
        repo: any,
        kafkaProducer: KafkaProducerService,
        validationDomainItemService: ItemService,
      ) =>
        new CreateItemUseCase(repo, kafkaProducer, validationDomainItemService),
      inject: ['IItemRepository', KafkaProducerService],
    },
  ],
  exports: [CreateItemUseCase],
})
export class ItemModule {}
