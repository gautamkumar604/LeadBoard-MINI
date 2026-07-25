import { Document } from 'mongoose';
export declare enum LeadStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    CLOSED = "CLOSED"
}
export declare class Lead extends Document {
    name: string;
    email: string;
    message: string;
    status: LeadStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, Document<unknown, any, Lead, any, {}> & Lead & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, Document<unknown, {}, import("mongoose").FlatRecord<Lead>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Lead> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
