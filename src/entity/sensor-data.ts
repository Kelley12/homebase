import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Sensor } from "./sensor";
import { Device } from "./device";

@Entity("sensorData")
export class SensorData {
    @PrimaryGeneratedColumn()
    public sensorDataId?: number;

    @OneToOne(_ => Device)
    @JoinColumn()
    public device?: Device;

    @OneToOne(_ => Sensor)
    @JoinColumn()
    public sensor!: Sensor;

    @Column("varchar", { length: 10 })
    public sensorValue!: string;
}
