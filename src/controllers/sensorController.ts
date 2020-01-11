import { EventEmitter2 } from "eventemitter2";
import { getManager, Repository } from "typeorm";
import { Sensor } from "../entity";

export class SensorController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Sensor>;

    constructor() {
        this.repository = getManager().getRepository(Sensor);
    }

    getSensors(): Promise<Sensor[]> {
        return this.repository.find();
    }

    getSensor(id: number): Promise<Sensor | undefined> {
        return this.repository.findOne(id);
    }

    createSensor(sensor: Sensor): Promise<Sensor> {
        const newSensor = this.repository.create(sensor);
        return this.repository.save(newSensor);
    }

    async updateSensor(sensor: Sensor, id: number): Promise<Sensor | undefined> {
        await this.repository.update(id, sensor);
        return this.repository.findOne(id);
    }

    async deleteSensor(id: number): Promise<boolean> {
        const deleted = await this.repository.delete(id);
        return deleted.raw[1] ? true : false;
    }

    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}
