import { Query, Resolver } from '@nestjs/graphql'

import { User } from 'src/modules/user.dto'
import { UserService } from 'src/modules/user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }
}
