import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { QueryLeadDto } from './dto/query-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminLeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('leads')
  async getLeads(@Query() queryDto: QueryLeadDto) {
    return this.leadsService.getLeads(queryDto);
  }

  @Patch('leads/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateLeadStatusDto,
  ) {
    return this.leadsService.updateLeadStatus(id, updateStatusDto);
  }

  @Get('dashboard')
  async getDashboardStats() {
    return this.leadsService.getDashboardStats();
  }
}
