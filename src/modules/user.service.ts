import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { CreateUserInput, UpdateUserInput } from 'src/modules/user.dto'
import { UserRepo } from 'src/modules/user.repo'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  findAll() {
    return this.userRepo.findAll()
  }

  async findOne(id: number) {
    try {
      return await this.userRepo.findOne(id)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException(`Không tìm thấy user có id ${id}`)
      }
      throw error
    }
  }

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.userRepo.create(createUserInput)
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException(`User có email ${createUserInput.email} đã tồn tại`)
      }
      throw error
    }
  }

  async update({ updateUserInput, userId }: { updateUserInput: UpdateUserInput; userId: number }) {
    try {
      return await this.userRepo.update({ id: userId, data: updateUserInput })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException(`Không tìm thấy user có id ${userId}`)
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException(`User có email ${updateUserInput.email} đã tồn tại`)
      }
      throw error
    }
  }

  async delete(userId: number) {
    try {
      return await this.userRepo.delete(userId)
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException(`Không tìm thấy user có id ${userId}`)
      }
      throw error
    }
  }
}
