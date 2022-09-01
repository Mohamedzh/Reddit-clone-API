import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Post } from "./post";
import { User } from "./user";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column()
    userId:number

    @CreateDateColumn({
        default: () => 'current_timestamp(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => 'current_timestamp(6)',
        onUpdate: 'current_timestamp(6)'
    })
    updatedAt: Date;

    @ManyToOne(() => Post, post => post.comments, { nullable: false })
    post: Post;


}