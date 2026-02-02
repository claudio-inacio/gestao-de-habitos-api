import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', unique: true})
    document: string

    @Column({type: 'text'})
    password: string
}