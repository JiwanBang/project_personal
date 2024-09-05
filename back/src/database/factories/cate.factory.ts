import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../../board/entities/category.entity';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();
  category.category = faker.name.lastName();

  return category;
});
