import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    createLead(createLeadDto: CreateLeadDto): Promise<{
        message: string;
        data: import("./schemas/lead.schema").Lead;
    }>;
}
