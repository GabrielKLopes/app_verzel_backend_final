import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { FavoriteFilms } from './FavoriteFilms';

@Entity('Users')
export class Users{
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(() => FavoriteFilms, favoriteFilms => favoriteFilms.user)
    favoriteFilms: FavoriteFilms[]
}