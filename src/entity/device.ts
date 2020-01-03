import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IDevice } from "../definitions";

@Entity()
export class Device implements IDevice {
    @PrimaryGeneratedColumn()
    public deviceId?: number;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("varchar", { length: 150 })
    public description!: string;

    @Column("varchar", { length: 17 })
    public mac!: string;

    @Column("varchar", { length: 15 })
    public ip!: string;

    @Column("varchar", { length: 50 })
    public type!: string;
}
