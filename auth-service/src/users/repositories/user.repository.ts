import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { User } from '../interfaces/user.interface'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { UpdateUserDTO } from '../dtos/update-user.dto'

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec()
    return users
  }

  async findOne(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec()
    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email })
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel(createUserDTO)
    const user = newUser.save()

    return user
  }

  async updateUser(userID, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID, updateUserDTO, { new: true })

    return updatedUser
  }

  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID)
    return deletedUser
  }
}
