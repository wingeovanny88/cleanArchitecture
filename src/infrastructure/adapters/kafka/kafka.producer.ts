import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, logLevel } from 'kafkajs';
import { kafkaConfig } from '../../config/kafka.config';
import { customLogger } from '../../../commons/logger';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
      logLevel: logLevel.INFO,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    customLogger.log('Kafka Producer conectado');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    customLogger.log('Kafka Producer desconectado');
  }

  async sendMessage(topic: string, message: any): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    customLogger.log(`Mensaje enviado a ${topic}`, message);
  }
}
