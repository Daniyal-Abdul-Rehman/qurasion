import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthResponseDto } from './dtos/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestId } from '../common/decorators/request-id.decorator';
import { ApiResponseDto } from '../common/dtos/api-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @RequestId() requestId: string,
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponseDto<AuthResponseDto>> {
    const result = await this.authService.register(registerDto);
    return ApiResponseDto.success(requestId, result);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @RequestId() requestId: string,
    @Body() loginDto: LoginDto,
  ): Promise<ApiResponseDto<AuthResponseDto>> {
    const result = await this.authService.login(loginDto);
    return ApiResponseDto.success(requestId, result);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(
    @RequestId() requestId: string,
    @Request() req,
  ): Promise<ApiResponseDto<any>> {
    return ApiResponseDto.success(requestId, req.user);
  }
}
