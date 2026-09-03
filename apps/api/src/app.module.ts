import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { InvestorsModule } from './investors/investors.module';
import { ValuationsModule } from './valuations/valuations.module';
import { UnderwritingModule } from './underwriting/underwriting.module';
import { MatchingModule } from './matching/matching.module';
import { OffersModule } from './offers/offers.module';
import { DealsModule } from './deals/deals.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { JobsModule } from './jobs/jobs.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    PropertiesModule,
    InvestorsModule,
    ValuationsModule,
    UnderwritingModule,
    MatchingModule,
    OffersModule,
    DealsModule,
    AuthModule,
    UsersModule,
    DocumentsModule,
    JobsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
