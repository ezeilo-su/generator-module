import { Generator } from './utils/index';

try {
  const idGenerator = new Generator(1, 10, 1);
  const id = idGenerator.getId();

  console.log(`ID: ${id}`);
} catch (error) {
  console.log(error);
}
