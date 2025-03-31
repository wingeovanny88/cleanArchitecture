export const kafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'nestjs-app',
  brokers: process.env.KAFKA_BROKERS
    ? process.env.KAFKA_BROKERS.split(',')
    : ['localhost:9092'],
};
