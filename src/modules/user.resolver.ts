import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ZodValidationPipe } from 'nestjs-zod'

import { CreateUserInput, UpdateUserInput, User } from 'src/modules/user.dto'
import { CreateUserBodySchema, UpdateUserBodySchema } from 'src/modules/user.schema'
import { UserService } from 'src/modules/user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id)
  }

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput', new ZodValidationPipe(CreateUserBodySchema)) createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('updateUserInput', new ZodValidationPipe(UpdateUserBodySchema)) updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update({ userId, updateUserInput })
  }

  @Mutation(() => User, { name: 'deleteUser' })
  delete(@Args('userId', { type: () => Int }) userId: number) {
    return this.userService.delete(userId)
  }
}
