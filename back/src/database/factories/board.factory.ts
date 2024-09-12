import { Board } from '../../board/entities/board.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Board, (faker) => {
  const board = new Board();
  board.title = faker.lorem.sentence();
  board.content = faker.lorem.text();

  return board;
});
