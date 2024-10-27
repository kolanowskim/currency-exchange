import {
  Controller,
  Get,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getExchangeRate() {
    try {
      const rate = await this.exchangeService.getExchangeRate();
      return rate;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch exchange rate',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('transaction')
  async createTransaction(@Query('amount') amount: string) {
    const eurAmount = parseFloat(amount);
    if (isNaN(eurAmount) || eurAmount <= 0) {
      throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
    }
    const transaction =
      await this.exchangeService.calculatePlnAmount(eurAmount);
    return transaction;
  }
}
