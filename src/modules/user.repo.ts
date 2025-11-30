import { Injectable } from '@nestjs/common'

import { Prisma } from 'src/generated/prisma/client'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    })
  }

  update({ id, data }: { id: number; data: Prisma.UserUpdateInput }) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
