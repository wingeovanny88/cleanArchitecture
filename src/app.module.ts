import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLoggerMiddleware } from './infrastructure/middleware/request-logger.middleware';
import { GlobalExceptionFilter } from './infrastructure/exceptions/global-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { ItemModule } from './infrastructure/modules/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        __dirname + '/infrastructure/adapters/database/*.orm.entity.{js,ts}',
      ],
      synchronize: true,
    }),
    ItemModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
