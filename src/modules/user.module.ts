import { Module } from '@nestjs/common'

import { UserResolver } from 'src/modules/user.resolver'
import { UserService } from 'src/modules/user.service'

@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
