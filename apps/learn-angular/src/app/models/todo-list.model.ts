import { TodoListItem } from './todo-list-item';

export type TodoList = {
  id: string;
  title: string;
  items: TodoListItem[];
};
