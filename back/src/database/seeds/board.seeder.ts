import { Board } from '../../board/entities/board.entity';
import { Category } from '../../board/entities/category.entity';
import { User } from '../../user/user.entity';

import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';

export default class BoardSeeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Board);
    const boardFactory = factoryManager.get(Board);

    const category = new Category();
    const user = new User();
    category.id = 1;
    user.id = 1;

    const post = await boardFactory.make({ writer: user, boardCate: category });
    await boardFactory.saveMany(10, post);
  }
}
