export interface IDatabaseAdapter {
  query<T>(query: string, params?: any[]): Promise<T[]>
  queryOne<T>(query: string, params?: any[]): Promise<T | null>
  insert<T>(query: string, params?: any[]): Promise<T>
  update<T>(query: string, params?: any[]): Promise<T>
}
