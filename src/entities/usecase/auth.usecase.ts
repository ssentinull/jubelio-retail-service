import { UserInterface } from '../model/user.model'

export interface IAuthUsecase {
  register(
    email: string,
    password: string,
    name: string,
  ): Promise<UserInterface>
}
