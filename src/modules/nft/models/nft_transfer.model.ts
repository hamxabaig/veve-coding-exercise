import { User } from 'modules/user/models/user.model';
import { NFT } from 'modules/nft/models/nft.model';
import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'nft_transfers' })
export class NFTTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  prevOwner: User;

  @ManyToOne(() => User)
  newOwner: User;

  @ManyToOne(() => NFT)
  nft: NFT;

  @CreateDateColumn()
  transferredAt: Date;
}
