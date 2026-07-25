import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  CLOSED = 'CLOSED',
}

@Schema({ timestamps: true })
export class Lead extends Document {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true, index: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 10, maxlength: 1000 })
  message: string;

  @Prop({ required: true, enum: LeadStatus, default: LeadStatus.NEW, index: true })
  status: LeadStatus;

  createdAt: Date;
  updatedAt: Date;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);

// Text index for fast multi-field search across name & email
LeadSchema.index({ name: 'text', email: 'text' });

// Compound index for status filtering sorted by newest first
LeadSchema.index({ status: 1, createdAt: -1 });
