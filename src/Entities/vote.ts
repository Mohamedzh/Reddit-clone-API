import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne, JoinColumn, Unique, Check } from "typeorm"
import { Post } from "./post";

@Entity()
@Unique(["userId", "post"])
export class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number

    @Column()
    @Check(`"value" = 1 or "value" = -1`)
    value: number;

    @CreateDateColumn({
        default: () => 'current_timestamp(6)'
    })
    createdAt: Date;

    @ManyToOne(() => Post, post => post.votes, { nullable: false })
    post: Post;

}