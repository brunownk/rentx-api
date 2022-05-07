import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      data.name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    this.categoriesRepository.create(data);
  }
}

export { CreateCategoryUseCase };
