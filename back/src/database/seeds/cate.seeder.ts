import { Category } from '../../category/category.entity';
import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';

export default class CateSeeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Category);
    // await repository.insert([{}]);
    const catsFactory = factoryManager.get(Category);
    await catsFactory.saveMany(10);
  }
}

/// npm run seed
