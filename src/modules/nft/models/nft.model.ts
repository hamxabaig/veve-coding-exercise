import { User } from 'modules/user/models/user.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'nfts' })
export class NFT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  blockchainLink: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'timestamp' })
  mintDate: Date;

  @ManyToOne(() => User, { eager: true })
  owner: User;
}
