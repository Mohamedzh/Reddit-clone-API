import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./posts";


@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column({nullable: true})
    // postId: number;

    @CreateDateColumn({
        default: ()=> 'current_timestamp(6)'
    })
    createdAt: Date;

    @ManyToMany(()=> Post)
    posts: Post[]
}