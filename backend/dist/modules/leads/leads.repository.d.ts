import { Model } from 'mongoose';
import { BaseRepository } from '../../database/base.repository';
import { Lead } from './schemas/lead.schema';
import { QueryLeadDto } from './dto/query-lead.dto';
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}
export interface DashboardStats {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    closedLeads: number;
    conversionRate: number;
}
export declare class LeadRepository extends BaseRepository<Lead> {
    private readonly leadModel;
    constructor(leadModel: Model<Lead>);
    findPaginated(queryDto: QueryLeadDto): Promise<PaginatedResult<Lead>>;
    getDashboardStats(): Promise<DashboardStats>;
}
