export interface Builder<T, U> {
  (builder: T): U;
}
