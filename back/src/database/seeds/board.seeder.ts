import { Board } from '../../board/entities/board.entity';
import { Category } from '../../category/category.entity';
import { User } from '../../user/user.entity';

import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';

export default class BoardSeeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Board);
    const boardFactory = factoryManager.get(Board);

    const userRepo = dataSource.getRepository(User);
    const cateRepo = dataSource.getRepository(Category);

    const UserData = await userRepo.find();
    const cateData = await cateRepo.find();
    console.log(UserData);
    console.log(cateData);
    if (UserData && cateData)
      for (let i = 1; i < 11; i++) {
        const category = new Category();
        const user = new User();
        category.id = cateData[i].id;
        user.id = UserData[i].id;
        const post = await boardFactory.make({
          writer: user,
          boardCate: category,
        });
        await boardFactory.save(post);
      }
  }
}
