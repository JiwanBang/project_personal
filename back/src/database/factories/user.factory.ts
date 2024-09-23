import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../user/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.user_id = faker.lorem.word();
  user.password = faker.lorem.word();
  user.nickname = faker.person.lastName();
  user.phone_num = faker.phone.number();

  return user;
});
