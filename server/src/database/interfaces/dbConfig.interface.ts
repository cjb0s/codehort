export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  schema?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
}
