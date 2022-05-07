import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const carInformation = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 10000,
      license_plate: "ABC-1234",
      fine_amount: 6000,
      brand: "Brand",
      category_id: "category",
    };

    const car = await createCarUseCase.execute(carInformation);

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      const firstCarInformation = {
        name: "Car1",
        description: "Description Car",
        daily_rate: 10000,
        license_plate: "ABC-1234",
        fine_amount: 6000,
        brand: "Brand",
        category_id: "category",
      };

      const secondCarInformationWithSameLicensePlate = {
        name: "Car2",
        description: "Description Car",
        daily_rate: 10000,
        license_plate: "ABC-1234",
        fine_amount: 6000,
        brand: "Brand",
        category_id: "category",
      };

      await createCarUseCase.execute(firstCarInformation);

      await createCarUseCase.execute(secondCarInformationWithSameLicensePlate);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const carInformation = {
      name: "Car Available",
      description: "Description Car",
      daily_rate: 10000,
      license_plate: "ABC-1234",
      fine_amount: 6000,
      brand: "Brand",
      category_id: "category",
    };

    const car = await createCarUseCase.execute(carInformation);

    expect(car.available).toBe(true);
  });
});
