import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { PropertySearchFiltersDto, CreatePropertyAnalysisDto } from './dtos/property.dto';
import { RequestId } from '../common/decorators/request-id.decorator';
import { ApiResponseDto, PaginatedResponseDto } from '../common/dtos/api-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('properties')
@Controller('properties')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiOperation({ summary: 'Search properties' })
  @ApiResponse({ status: 200, description: 'Properties found successfully' })
  async searchProperties(
    @RequestId() requestId: string,
    @Query() filters: PropertySearchFiltersDto,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
  ) {
    const result = await this.propertiesService.searchProperties(
      filters,
      parseInt(page),
      parseInt(pageSize),
    );
    return new PaginatedResponseDto(requestId, result.properties, result.pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, description: 'Property found successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async getProperty(@RequestId() requestId: string, @Param('id') id: string) {
    const property = await this.propertiesService.getProperty(id);
    return ApiResponseDto.success(requestId, property);
  }

  @Post(':id/analyses')
  @ApiOperation({ summary: 'Create property analysis' })
  @ApiResponse({ status: 202, description: 'Analysis job created' })
  async createPropertyAnalysis(
    @RequestId() requestId: string,
    @Param('id') id: string,
    @Body() dto: CreatePropertyAnalysisDto,
  ) {
    const analysis = await this.propertiesService.createPropertyAnalysis(id, dto.assumptions);
    return ApiResponseDto.success(requestId, analysis);
  }
}
