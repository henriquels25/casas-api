import { Column, Entity, JoinColumn, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Endereco } from "./Endereco";
import { Foto } from "./Foto";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    nome: string;

    @Column()
    idade: number;

    @OneToMany(() => Foto, foto => foto.usuario, {eager: true})
    fotos: Foto[];

    @OneToOne(() => Endereco, endereco => endereco.usuario,
                 {cascade: true})
    @JoinColumn({ name: 'endereco_id' })  
    endereco: Endereco;
}