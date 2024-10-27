import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ExchangeService } from './exchange/exchange.service';
import { ExchangeController } from './exchange/exchange.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CacheModule.register(),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class AppModule {}
