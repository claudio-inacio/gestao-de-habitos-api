import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity("videos") // basicamente diz: crie pra mim uma tabela com o nome videos
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;
  @Column({ type: "varchar", nullable: true }) // permite o campo não ser obrigatorio.
  url: string;

  @ManyToOne(() => Room, room => room.videos) // dizemos que a nossa tabela vai ter um relacionamento de muitos pra um com a nossa tabela Room
  @JoinColumn({name: 'room_id' })// referenciamos qual o nome da nossa chave estrangeira deve ser criada no banco de dados (sempre utilizado somente na tabela que tem a FK)
  room: Room;
}
