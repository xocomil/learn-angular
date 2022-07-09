import { faker } from '@faker-js/faker/locale/en';
import { TodoListItem } from '../todo-list-item';

export const createFakeTodoListItem = ({
  done = faker.datatype.boolean(),
  description = faker.random.words(),
}: Partial<TodoListItem> = {}): TodoListItem => ({ done, description });
