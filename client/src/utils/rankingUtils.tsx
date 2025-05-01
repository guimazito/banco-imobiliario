import type { Task } from '../types';

export function getRanking(tasks: Task[]) {
  return [...tasks].sort((a, b) => b.money - a.money);
}