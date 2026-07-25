import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { BaseRepository } from '../../database/base.repository';
import { Lead, LeadStatus } from './schemas/lead.schema';
import { QueryLeadDto } from './dto/query-lead.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
  conversionRate: number;
}

@Injectable()
export class LeadRepository extends BaseRepository<Lead> {
  constructor(
    @InjectModel(Lead.name)
    private readonly leadModel: Model<Lead>,
  ) {
    super(leadModel);
  }

  async findPaginated(queryDto: QueryLeadDto): Promise<PaginatedResult<Lead>> {
    const { page = 1, limit = 10, search, status, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
    const filter: FilterQuery<Lead> = {};

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
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

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

  async getDashboardStats(): Promise<DashboardStats> {
    const [totalLeads, newLeads, contactedLeads, closedLeads] = await Promise.all([
      this.leadModel.countDocuments().exec(),
      this.leadModel.countDocuments({ status: LeadStatus.NEW }).exec(),
      this.leadModel.countDocuments({ status: LeadStatus.CONTACTED }).exec(),
      this.leadModel.countDocuments({ status: LeadStatus.CLOSED }).exec(),
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
}
