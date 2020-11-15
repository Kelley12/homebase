import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sensor")
export class Sensor {
    @PrimaryGeneratedColumn()
    public sensorId?: number;

    @Column("varchar", { length: 50 })
    public name!: string;

    @Column("varchar", { length: 150 })
    public description!: string;
}
