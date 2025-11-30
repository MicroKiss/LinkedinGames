import { Model, Sequelize } from "sequelize";

export interface UserModel extends Model {
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface DbModels {
  User: typeof Model & { new (): UserModel };
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

declare const db: DbModels;
export default db;
