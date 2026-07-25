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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../modules/users/schemas/user.schema");
let SeedService = SeedService_1 = class SeedService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async onApplicationBootstrap() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        const adminEmail = 'admin@leaddesk.com';
        const existingAdmin = await this.userModel.findOne({ email: adminEmail }).exec();
        if (!existingAdmin) {
            const defaultPassword = 'Admin@123';
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
            const adminUser = new this.userModel({
                username: 'admin',
                email: adminEmail,
                password: hashedPassword,
                role: user_schema_1.UserRole.ADMIN,
            });
            await adminUser.save();
            this.logger.log(`✅ Default admin user created successfully: ${adminEmail}`);
        }
        else {
            this.logger.log(`ℹ️ Admin user already exists: ${adminEmail}`);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeedService);
//# sourceMappingURL=seed.service.js.map