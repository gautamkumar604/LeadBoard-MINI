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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../database/base.repository");
const lead_schema_1 = require("./schemas/lead.schema");
let LeadRepository = class LeadRepository extends base_repository_1.BaseRepository {
    constructor(leadModel) {
        super(leadModel);
        this.leadModel = leadModel;
    }
    async findPaginated(queryDto) {
        const { page = 1, limit = 10, search, status, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
        const filter = {};
        if (status) {
            filter.status = status;
        }
        if (search && search.trim() !== '') {
            filter.$or = [
                { name: { $regex: search.trim(), $options: 'i' } },
                { email: { $regex: search.trim(), $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
        const [data, total] = await Promise.all([
            this.leadModel.find(filter).sort(sort).skip(skip).limit(limit).exec(),
            this.leadModel.countDocuments(filter).exec(),
        ]);
        const totalPages = Math.ceil(total / limit) || 1;
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }
    async getDashboardStats() {
        const [totalLeads, newLeads, contactedLeads, closedLeads] = await Promise.all([
            this.leadModel.countDocuments().exec(),
            this.leadModel.countDocuments({ status: lead_schema_1.LeadStatus.NEW }).exec(),
            this.leadModel.countDocuments({ status: lead_schema_1.LeadStatus.CONTACTED }).exec(),
            this.leadModel.countDocuments({ status: lead_schema_1.LeadStatus.CLOSED }).exec(),
        ]);
        const conversionRate = totalLeads > 0 ? Number(((closedLeads / totalLeads) * 100).toFixed(2)) : 0;
        return {
            totalLeads,
            newLeads,
            contactedLeads,
            closedLeads,
            conversionRate,
        };
    }
};
exports.LeadRepository = LeadRepository;
exports.LeadRepository = LeadRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeadRepository);
//# sourceMappingURL=leads.repository.js.map