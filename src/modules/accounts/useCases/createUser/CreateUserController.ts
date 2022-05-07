import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { ...data }: ICreateUserDTO = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(data);

    return res.status(201).send();
  }
}

export { CreateUserController };
