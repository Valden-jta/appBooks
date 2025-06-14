import { Book } from './book';
import { User } from './user';

export class ApiAnswer {
  constructor(
    public error: boolean,
    public code: number,
    public message: string,
    public data: User | Book | Book[]
  ) {}
}
