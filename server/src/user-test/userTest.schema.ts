import { Table, Column, Model, DataType, ForeignKey, DefaultScope } from 'sequelize-typescript';
import { Task } from 'src/task/task.schema';

@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}))
@Table
export class UserTest extends Model<UserTest> {
  //userTest non-relational properties

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  regex: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  suggestion: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  variableRegex: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  terminalRegex: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  install: boolean;

  //One to one relationship with task

  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
  })
  taskId: number;
}
