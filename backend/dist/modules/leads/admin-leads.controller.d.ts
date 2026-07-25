import { LeadsService } from './leads.service';
import { QueryLeadDto } from './dto/query-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-status.dto';
export declare class AdminLeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
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
    updateStatus(id: string, updateStatusDto: UpdateLeadStatusDto): Promise<{
        message: string;
        data: import("./schemas/lead.schema").Lead;
    }>;
    getDashboardStats(): Promise<{
        message: string;
        data: import("./leads.repository").DashboardStats;
    }>;
}
