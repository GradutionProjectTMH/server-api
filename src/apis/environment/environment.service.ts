import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class EnvironmentService {
  async getAll() {
    const data = fs.readFileSync('public/env.client.json', 'utf8');
    return JSON.parse(data);
  }

  async updateById(data: string) {
    console.log(data);
    console.log(typeof data);

    return fs.writeFileSync(
      'public/env.client.json',
      JSON.stringify(data),
      'utf-8',
    );
  }
}
