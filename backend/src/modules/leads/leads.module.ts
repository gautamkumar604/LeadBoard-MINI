import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from './schemas/lead.schema';
import { LeadRepository } from './leads.repository';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { AdminLeadsController } from './admin-leads.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
    AuthModule,
  ],
  controllers: [LeadsController, AdminLeadsController],
  providers: [LeadRepository, LeadsService],
  exports: [LeadRepository, LeadsService],
})
export class LeadsModule {}
