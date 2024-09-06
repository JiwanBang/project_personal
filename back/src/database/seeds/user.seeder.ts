import { User } from '../../user/user.entity';
import { DataSource } from 'typeorm';
import { SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(User);
    const dupUser = await repository.find({ where: { user_id: 'test1' } });
    if (!dupUser) {
      await repository.insert({
        id: 1,
        user_id: 'test1',
        password: '1234qwer',
        phone_num: '01012345678',
        nickname: 'test10',
      });
    }

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
