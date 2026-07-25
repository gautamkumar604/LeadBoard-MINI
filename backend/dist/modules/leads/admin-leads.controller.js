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
exports.AdminLeadsController = void 0;
const common_1 = require("@nestjs/common");
const leads_service_1 = require("./leads.service");
const query_lead_dto_1 = require("./dto/query-lead.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AdminLeadsController = class AdminLeadsController {
    constructor(leadsService) {
        this.leadsService = leadsService;
    }
    async getLeads(queryDto) {
        return this.leadsService.getLeads(queryDto);
    }
    async updateStatus(id, updateStatusDto) {
        return this.leadsService.updateLeadStatus(id, updateStatusDto);
    }
    async getDashboardStats() {
        return this.leadsService.getDashboardStats();
    }
};
exports.AdminLeadsController = AdminLeadsController;
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_lead_dto_1.QueryLeadDto]),
    __metadata("design:returntype", Promise)
], AdminLeadsController.prototype, "getLeads", null);
__decorate([
    (0, common_1.Patch)('leads/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateLeadStatusDto]),
    __metadata("design:returntype", Promise)
], AdminLeadsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLeadsController.prototype, "getDashboardStats", null);
exports.AdminLeadsController = AdminLeadsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [leads_service_1.LeadsService])
], AdminLeadsController);
//# sourceMappingURL=admin-leads.controller.js.map