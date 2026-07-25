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
exports.LeadSchema = exports.Lead = exports.LeadStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["NEW"] = "NEW";
    LeadStatus["CONTACTED"] = "CONTACTED";
    LeadStatus["CLOSED"] = "CLOSED";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
let Lead = class Lead extends mongoose_2.Document {
};
exports.Lead = Lead;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, minlength: 2, maxlength: 100 }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true, index: true }),
    __metadata("design:type", String)
], Lead.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, minlength: 10, maxlength: 1000 }),
    __metadata("design:type", String)
], Lead.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: LeadStatus, default: LeadStatus.NEW, index: true }),
    __metadata("design:type", String)
], Lead.prototype, "status", void 0);
exports.Lead = Lead = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Lead);
exports.LeadSchema = mongoose_1.SchemaFactory.createForClass(Lead);
exports.LeadSchema.index({ name: 'text', email: 'text' });
exports.LeadSchema.index({ status: 1, createdAt: -1 });
//# sourceMappingURL=lead.schema.js.map