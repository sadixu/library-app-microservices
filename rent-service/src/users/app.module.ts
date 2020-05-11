import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RentModule } from './rent.module'

@Module({
  imports: [ConfigModule.forRoot(), RentModule],
})
export class AppModule {}
