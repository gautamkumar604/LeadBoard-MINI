import { IsEnum, IsNotEmpty } from 'class-validator';
import { LeadStatus } from '../schemas/lead.schema';

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus, { message: 'Status must be one of: NEW, CONTACTED, CLOSED' })
  @IsNotEmpty({ message: 'Status is required' })
  status: LeadStatus;
}
