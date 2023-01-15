import { TodoListItem } from './todo-list-item';

export type TodoList = {
  id: number;
  title: string;
  items: TodoListItem[];
};
