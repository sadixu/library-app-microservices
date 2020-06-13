import { Injectable, Logger } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { User } from '../interfaces/user.interface'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { RegisterUserCommand } from '../commands/impl/register-user.command'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly commandBus: CommandBus) {}
  async registerUser(dto: CreateUserDTO) {
    return this.commandBus.execute(
      new RegisterUserCommand(dto.firstname, dto.lastname, dto.email, dto.age, dto.password),
    )
  }
  // fetch all users
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec()
    return users
  }
  // Get a single user
  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec()
    return user
  }
  // post a single user
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel(createUserDTO)
    return newUser.save()
  }
  // Edit user details
  async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true })
    return updatedUser
  }
  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID)
    return deletedUser
  }
}
