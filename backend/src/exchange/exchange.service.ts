import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangeService {
  private readonly API_URL: string;
  private readonly API_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.API_URL = this.configService.get<string>('API_URL');
    this.API_KEY = this.configService.get<string>('API_KEY');
  }

  async getExchangeRate(): Promise<number> {
    const cachedRate = await this.cacheManager.get<number>('exchange_rate');
    if (cachedRate) return cachedRate;

    const response = await firstValueFrom(
      this.httpService.get(this.API_URL, {
        headers: { 'x-api-key': this.API_KEY },
      }),
    );
    const rate = response.data.exchange_rate;

    await this.cacheManager.set('exchange_rate', rate, 60000);
    return rate;
  }

  async calculatePlnAmount(eurAmount: number): Promise<number> {
    const rate = await this.getExchangeRate();
    return eurAmount * rate;
  }
}
