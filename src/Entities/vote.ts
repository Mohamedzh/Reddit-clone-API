import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne, JoinColumn, Unique, Check } from "typeorm"
import { Post } from "./posts";
import { User } from "./users";

@Entity()
@Unique(["user", "post"])
export class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Check(`"value" = 1 or "value" = -1`)
    value: number;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @CreateDateColumn({
        default: ()=> 'current_timestamp(6)'
    })
    createdAt: Date;
    
    @ManyToOne(()=>User, user => user.votes, {nullable: false})
    @JoinColumn({name:"userId"})
    user: User;

    @ManyToOne(()=>Post, post => post.votes, {nullable: false})
    @JoinColumn({name:"postId"})
    post: Post;

}