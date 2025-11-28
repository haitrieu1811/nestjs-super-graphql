import { Injectable } from '@nestjs/common'

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

  findAll() {
    return Promise.resolve(this.users)
  }
}
