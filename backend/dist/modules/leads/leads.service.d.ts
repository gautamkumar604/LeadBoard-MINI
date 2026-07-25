import { LeadRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-status.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
export declare class LeadsService {
    private readonly leadRepository;
    constructor(leadRepository: LeadRepository);
    createLead(createLeadDto: CreateLeadDto): Promise<{
        message: string;
        data: import("./schemas/lead.schema").Lead;
    }>;
    getLeads(queryDto: QueryLeadDto): Promise<{
        message: string;
        data: import("./schemas/lead.schema").Lead[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    updateLeadStatus(id: string, updateStatusDto: UpdateLeadStatusDto): Promise<{
        message: string;
        data: import("./schemas/lead.schema").Lead;
    }>;
    getDashboardStats(): Promise<{
        message: string;
        data: import("./leads.repository").DashboardStats;
    }>;
}
