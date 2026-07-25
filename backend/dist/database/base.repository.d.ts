import { Document, Model, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
export declare abstract class BaseRepository<T extends Document> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(doc: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    find(filter?: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
    update(id: string, update: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    count(filter?: FilterQuery<T>): Promise<number>;
}
