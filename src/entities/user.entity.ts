import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER, nullable: false })
  role: ROLE;
}
