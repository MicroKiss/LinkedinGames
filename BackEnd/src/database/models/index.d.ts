import { Model, ModelCtor, Sequelize } from 'sequelize';

// Attributes for each model
export interface UserAttributes {
  id?: number;
  name: string;
  username: string;
  password: string;
}

export interface GameAttributes {
  id?: number;
  name: string;
}

export interface RecordAttributes {
  id?: number;
  gameId: number;
  userId: number;
  date: string; // DATEONLY
  time: number;
}

// Sequelize model instances
export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  // Association helpers injected by Sequelize (optional)
  Games?: GameInstance[];
}

export interface GameInstance extends Model<GameAttributes>, GameAttributes {
  // Association helpers / included models
  Users?: UserInstance[];
}

export interface RecordInstance extends Model<RecordAttributes>, RecordAttributes {
  User?: UserInstance;
  Game?: GameInstance;
}

export interface DbModels {
  User: ModelCtor<UserInstance>;
  Game: ModelCtor<GameInstance>;
  Record: ModelCtor<RecordInstance>;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

declare const db: DbModels;
export default db;
