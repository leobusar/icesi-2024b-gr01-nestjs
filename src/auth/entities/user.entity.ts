import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullName: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password: string;

    @Column('boolean', {default: true})
    isActive: boolean;

    @Column('text', {array: true, default: ['user']})
    roles: string[];

    @BeforeInsert()
    checkEmail(): void {
        this.email = this.email.toLowerCase();
    }

    @BeforeUpdate()
    checkEmailUpdate(): void {
        this.checkEmail();
    }
}