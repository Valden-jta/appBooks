export class ApiAnswer<T = any> {
  constructor(
    public error: boolean,
    public code: number,
    public message: string,
    public data:T
  ) {}
}
