import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm"
import { Comment } from "./comment";
import { Post } from "./post";
import { Vote } from "./vote";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({
        default: () => 'current_timestamp(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => 'current_timestamp(6)'
    })
    updatedAt: Date;

    // @OneToMany(() => Comment, comment => comment.user)
    // comments: Comment[];

    // @OneToMany(() => Post, post => 
    // posts: Post[];post.user)

    // @OneToMany(() => Vote, vote => vote.user)
    // votes: Vote[];
}