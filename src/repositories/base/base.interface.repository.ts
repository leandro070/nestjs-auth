export interface BaseInterfaceRepository<T> {
  create(data: T): Promise<number>;
  findOneById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  remove(id: number): Promise<boolean>;
  query(sql: string, args?: any): Promise<any | T[] | T>;
}
