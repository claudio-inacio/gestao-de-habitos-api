import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;


    //criamos a realção de muitos pra muitos
    // o primeiro Room significa que a nossa tabela subjects tera relação com a tabela Room
    // o comando room => room.subjects diz que a nossa tabela Room tambem tera relação com a nossa tabela subjects
    @ManyToMany(() => Room, room => room.subjects)

    //configurando nossa tabela ternaria... (basicamente é a tabela que faz a ligação entre as tabelas subject e room) 
    @JoinTable({
        name: 'room_subject', // a tabela de relação tera o nome room_subject
        joinColumn: { // qual a coluna irá se juntar e ser referenciada na nossa nova tabela de realação
            name: 'room_id',
            referencedColumnName: 'id', // da minha entidade Room eu quero o ID seja a referencia nessa nova tabela de relação
        },
        inverseJoinColumn: {// é a referencia inversa ou seja.. estamos falando que a tabela Room devera referenciar quais campos da nossa tabela subject
            name: 'subject_id',
            referencedColumnName: 'id',
        }
    })
    rooms: Room[]
}