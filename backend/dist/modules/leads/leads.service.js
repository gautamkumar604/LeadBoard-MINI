"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const leads_repository_1 = require("./leads.repository");
let LeadsService = class LeadsService {
    constructor(leadRepository) {
        this.leadRepository = leadRepository;
    }
    async createLead(createLeadDto) {
        const lead = await this.leadRepository.create(createLeadDto);
        return {
            message: 'Lead submitted successfully',
            data: lead,
        };
    }
    async getLeads(queryDto) {
        const result = await this.leadRepository.findPaginated(queryDto);
        return {
            message: 'Leads fetched successfully',
            data: result.data,
            meta: result.meta,
        };
    }
    async updateLeadStatus(id, updateStatusDto) {
        const existingLead = await this.leadRepository.findById(id);
        if (!existingLead) {
            throw new common_1.NotFoundException(`Lead with ID '${id}' not found`);
        }
        const updatedLead = await this.leadRepository.update(id, {
            status: updateStatusDto.status,
        });
        return {
            message: `Lead status updated to ${updateStatusDto.status}`,
            data: updatedLead,
        };
    }
    async getDashboardStats() {
        const stats = await this.leadRepository.getDashboardStats();
        return {
            message: 'Dashboard statistics retrieved successfully',
            data: stats,
        };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leads_repository_1.LeadRepository])
], LeadsService);
//# sourceMappingURL=leads.service.js.map