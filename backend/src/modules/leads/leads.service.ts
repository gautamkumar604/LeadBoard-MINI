import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-status.dto';
import { QueryLeadDto } from './dto/query-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly leadRepository: LeadRepository) {}

  async createLead(createLeadDto: CreateLeadDto) {
    const lead = await this.leadRepository.create(createLeadDto);
    return {
      message: 'Lead submitted successfully',
      data: lead,
    };
  }

  async getLeads(queryDto: QueryLeadDto) {
    const result = await this.leadRepository.findPaginated(queryDto);
    return {
      message: 'Leads fetched successfully',
      data: result.data,
      meta: result.meta,
    };
  }

  async updateLeadStatus(id: string, updateStatusDto: UpdateLeadStatusDto) {
    const existingLead = await this.leadRepository.findById(id);
    if (!existingLead) {
      throw new NotFoundException(`Lead with ID '${id}' not found`);
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
}
