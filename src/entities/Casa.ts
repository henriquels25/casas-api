import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, IsNotEmpty, Max, Min, MaxLength } from 'class-validator'

@Entity()
export class Casa {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('int', {name: "nr_quartos"})
    @Min(0)
    @Max(20)
    nrQuartos: number;

    @Column('int', {name: "nr_janelas"})
    nrJanelas: number

    @Column('varchar', {length: 150})
    @IsNotEmpty()
    @MaxLength(150)
    cor: string;

    @Column({name: "possui_garagem"})
    possuiGaragem: boolean;

    @Column({name: "data_construcao", nullable: true})
    @IsDate()
    dataConstrucao: Date

    @Column()
    @IsEmail()
    email: string;
}
