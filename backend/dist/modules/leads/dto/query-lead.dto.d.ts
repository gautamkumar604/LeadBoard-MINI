import { LeadStatus } from '../schemas/lead.schema';
export declare class QueryLeadDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: LeadStatus;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
