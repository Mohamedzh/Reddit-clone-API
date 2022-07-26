import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Comment } from "./comments";
import { Vote } from "./vote";
import { User } from "./users";
import { Tag } from "./tags";


@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId:number;

    @CreateDateColumn({
        default: ()=> 'current_timestamp(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: ()=> 'current_timestamp(6)',
        onUpdate:  "current_timestamp(6)"
    })
    updatedAt: Date;

    @ManyToOne(()=> User, user => user.posts, {nullable: false})
    @JoinColumn({name:"userId"})
    user: User;

    @OneToMany(()=> Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(()=> Vote, vote => vote.post)
    votes: Vote[];

    @ManyToMany(()=> Tag)
    @JoinTable()
    tags: Tag[]


}