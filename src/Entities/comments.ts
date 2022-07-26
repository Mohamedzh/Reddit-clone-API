import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Post } from "./posts";
import { User } from "./users";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @Column()
    body: string;

    @CreateDateColumn({
        default: () => 'current_timestamp(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => 'current_timestamp(6)',
        onUpdate: 'current_timestamp(6)'
    })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.comments, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Post, post => post.comments, { nullable: false })
    @JoinColumn({ name: "postId" })
    post: Post;


}