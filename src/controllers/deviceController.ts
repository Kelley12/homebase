import { EventEmitter2 } from "eventemitter2";
import { Device } from "../entity";
import { getManager, Repository } from "typeorm";

export class DeviceController {
    private readonly emitter = new EventEmitter2();
    private readonly repository: Repository<Device>;

    constructor() {
        this.repository = getManager().getRepository(Device);
    }

    getDevices(): Promise<Device[]> {
        return this.repository.find();
    }

    getDevice(id: number): Promise<Device | undefined> {
        return this.repository.findOne(id);
    }

    createDevice(device: Device): Promise<Device> {
        const newDevice = this.repository.create(device);
        return this.repository.save(newDevice);
    }

    async updateDevice(device: Device, id: number): Promise<Device | undefined> {
        await this.repository.update(id, device);
        return this.repository.findOne(id);
    }

    async deleteDevice(id: number): Promise<boolean> {
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
