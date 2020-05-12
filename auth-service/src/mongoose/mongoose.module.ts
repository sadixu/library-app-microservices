import { Module } from '@nestjs/common'
import { mongooseProvider } from './providers/mongoose.provider'

@Module({
  providers: [...mongooseProvider],
  exports: [...mongooseProvider],
})
export class MongooseModule {}
