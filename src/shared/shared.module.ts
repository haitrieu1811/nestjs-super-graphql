import { Global, Module } from '@nestjs/common'

import { PrismaService } from 'src/shared/services/prisma.service'

const sharedProviders = [PrismaService]

@Global()
@Module({
  providers: [...sharedProviders],
  exports: [...sharedProviders],
})
export class SharedModule {}
