import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const categoty = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(categoty);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      categoty.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const categoty = {
        name: "Category Test",
        description: "Category description Test",
      };

      await createCategoryUseCase.execute(categoty);

      await createCategoryUseCase.execute(categoty);
    }).rejects.toBeInstanceOf(AppError);
  });
});
