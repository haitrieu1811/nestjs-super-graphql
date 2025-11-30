import { Module } from '@nestjs/common'

import { UserRepo } from 'src/modules/user.repo'
import { UserResolver } from 'src/modules/user.resolver'
import { UserService } from 'src/modules/user.service'

@Module({
  providers: [UserService, UserResolver, UserRepo],
})
export class UserModule {}
