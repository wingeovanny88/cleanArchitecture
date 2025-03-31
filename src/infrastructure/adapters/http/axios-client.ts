import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ timeout: 5000 });
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}
