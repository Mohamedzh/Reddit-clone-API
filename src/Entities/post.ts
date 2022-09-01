import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Comment } from "./comment";
import { Vote } from "./vote";
import { User } from "./user";
import { Tag } from "./tag";


@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId:number

    @Column()
    title: string;

    @Column()
    body: string;

    @CreateDateColumn({
        default: ()=> 'current_timestamp(6)'
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: ()=> 'current_timestamp(6)',
        onUpdate:  "current_timestamp(6)"
    })
    updatedAt: Date;

    @OneToMany(()=> Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(()=> Vote, vote => vote.post)
    votes: Vote[];

    @ManyToMany(()=> Tag)
    @JoinTable()
    tags: Tag[]


}