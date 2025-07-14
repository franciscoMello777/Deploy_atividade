import {Entity, PrimaryGeneratedColumn, Column, AfterLoad, BeforeInsert, BeforeUpdate} from "typeorm";
import bcrypt from 'bcryptjs'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({type: "varchar", length: 100, nullable: false, unique: true})
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    private originalPassword: string

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.originalPassword = password
    }

    @AfterLoad()
    setOriginalPassword(){
        this.originalPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password !== this.originalPassword){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
    }
}