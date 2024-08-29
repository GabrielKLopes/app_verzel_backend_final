import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity('FavoriteFilms')
export class FavoriteFilms{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    movie_id: number;

    @ManyToOne(() => Users, user => user.favoriteFilms)
    user:Users;
}