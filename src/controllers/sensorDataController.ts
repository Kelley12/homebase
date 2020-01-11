import { EventEmitter2 } from "eventemitter2";
import { getManager, Repository } from "typeorm";
import { SensorData } from "../entity";

export class SensorDataController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<SensorData>;

    constructor() {
        this.repository = getManager().getRepository(SensorData);
    }

    getSensorData(): Promise<SensorData[]> {
        return this.repository.find();
    }

    getDeviceSensorData(id: number): Promise<SensorData | undefined> {
        return this.repository.findOne(id);
    }

    createSensorData(sensorData: SensorData): Promise<SensorData> {
        const newSensorData = this.repository.create(sensorData);
        return this.repository.save(newSensorData);
    }

    async updateSensorData(sensorData: SensorData, id: number): Promise<SensorData | undefined> {
        await this.repository.update(id, sensorData);
        return this.repository.findOne(id);
    }

    async deleteSensorData(id: number): Promise<boolean> {
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
