import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('produto')
export class Produto {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    preco: number;

    @Column({ type: "varchar", length: 255 })
    descricao: string;

    constructor(name: string, preco: number, descricao: string) {
        this.name = name;
        this.preco = preco;
        this.descricao = descricao;        
    }

}