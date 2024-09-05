import { User } from '../../user/user.entity';
import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(User);
    await repository.insert({
      user_id: 'test1',
      password: '1234qwer',
      phone_num: '01012345678',
      nickname: 'test10',
    });
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
