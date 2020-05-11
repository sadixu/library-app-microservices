import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BooksModule } from './books.module'

@Module({
  imports: [ConfigModule.forRoot(), BooksModule],
})
export class AppModule {}
