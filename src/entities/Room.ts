import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

//@entity é um decorator que nos permite definir o nome da tabela.
@Entity('room') // identificamos qual o nome que sera atribuido a nossa tabela
export class Room {
    @PrimaryGeneratedColumn() // Decorator para identificarmos que esse sera a nossa PRIMARYKEY
    id: number;

    @Column({type: 'varchar'})// Decorator para identificarmos que essa sera apenas uma coluna do tipo texto
    name: string;
    @Column({type: 'varchar'})// Decorator para identificarmos que essa sera apenas uma coluna do tipo texto
    description: string;


    //criamos aqui o relacionamento da nossa tabela room com a nossa tabela video
    @OneToMany(() => Video, (video) => video.room)
    videos: Video[]


    // criamos o relacionamento com a tabela subject
    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[]
}