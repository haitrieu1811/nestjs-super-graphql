import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateUserInput, UpdateUserInput, User } from 'src/modules/user.dto'

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Alex Smith',
      email: 'alex@example.com',
      password: 'password',
      createdAt: new Date().toISOString(),
    },
  ]

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users)
  }

  findOne(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NotFoundException('UserNotFound')
    }
    return Promise.resolve(user)
  }

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser: User = {
      id: this.users[this.users.length - 1].id++,
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      createdAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    return Promise.resolve(newUser)
  }

  update({ updateUserInput, userId }: { updateUserInput: UpdateUserInput; userId: number }): Promise<User> {
    const index = this.users.findIndex((user) => user.id === userId)
    if (index === -1) {
      throw new NotFoundException('UserNotFound')
    }
    this.users = this.users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          name: updateUserInput.name ?? user.name,
          email: updateUserInput.email ?? user.email,
          password: updateUserInput.password ?? user.password,
        }
      }
      return user
    })
    return Promise.resolve(this.users.find((user) => user.id === userId) as User)
  }

  delete(userId: number): Promise<User> {
    const index = this.users.findIndex((user) => user.id === userId)
    if (index === -1) {
      throw new NotFoundException('UserNotFound')
    }
    const user = this.users.find((user) => user.id === userId) as User
    this.users.splice(index, 1)
    return Promise.resolve(user)
  }
}
