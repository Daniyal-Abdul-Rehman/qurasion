import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);
  private readonly migrationsPath = path.join(process.cwd(), '../../db/migrations');

  constructor(private readonly configService: ConfigService) {}

  async runMigrations() {
    const client = new Client({
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      user: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_DATABASE', 'real_estate_platform'),
    });

    try {
      await client.connect();
      this.logger.log('Connected to database for migrations');

      // Create migrations table if it doesn't exist
      await this.createMigrationsTable(client);

      // Get already executed migrations
      const executedMigrations = await this.getExecutedMigrations(client);

      // Get all migration files
      const migrationFiles = this.getMigrationFiles();

      // Filter out already executed migrations
      const pendingMigrations = migrationFiles.filter(
        file => !executedMigrations.includes(file)
      );

      if (pendingMigrations.length === 0) {
        this.logger.log('No pending migrations to run');
        return;
      }

      this.logger.log(`Found ${pendingMigrations.length} pending migrations`);

      // Execute pending migrations
      for (const file of pendingMigrations) {
        await this.runMigration(client, file);
      }

      this.logger.log('All migrations completed successfully');
    } catch (error) {
      this.logger.error('Migration failed:', error);
      throw error;
    } finally {
      await client.end();
    }
  }

  private async createMigrationsTable(client: Client) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT NOW()
      )
    `);
  }

  private async getExecutedMigrations(client: Client): Promise<string[]> {
    const result = await client.query('SELECT filename FROM schema_migrations ORDER BY executed_at');
    return result.rows.map(row => row.filename);
  }

  private getMigrationFiles(): string[] {
    if (!fs.existsSync(this.migrationsPath)) {
      this.logger.warn(`Migrations directory not found: ${this.migrationsPath}`);
      return [];
    }

    const files = fs.readdirSync(this.migrationsPath)
      .filter(file => file.endsWith('.sql'))
      .sort();

    return files;
  }

  private async runMigration(client: Client, filename: string) {
    const filePath = path.join(this.migrationsPath, filename);
    const migrationSQL = fs.readFileSync(filePath, 'utf8');

    this.logger.log(`Running migration: ${filename}`);

    try {
      await client.query('BEGIN');
      await client.query(migrationSQL);
      await client.query(
        'INSERT INTO schema_migrations (filename) VALUES ($1)',
        [filename]
      );
      await client.query('COMMIT');
      this.logger.log(`Migration completed: ${filename}`);
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Migration failed: ${filename}`, error);
      throw error;
    }
  }

  async rollbackMigration(filename?: string) {
    const client = new Client({
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      user: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_DATABASE', 'real_estate_platform'),
    });

    try {
      await client.connect();
      this.logger.log('Connected to database for rollback');

      if (filename) {
        // Rollback specific migration
        await client.query('DELETE FROM schema_migrations WHERE filename = $1', [filename]);
        this.logger.log(`Rolled back migration: ${filename}`);
      } else {
        // Rollback last migration
        const result = await client.query(
          'SELECT filename FROM schema_migrations ORDER BY executed_at DESC LIMIT 1'
        );
        
        if (result.rows.length > 0) {
          const lastMigration = result.rows[0].filename;
          await client.query('DELETE FROM schema_migrations WHERE filename = $1', [lastMigration]);
          this.logger.log(`Rolled back migration: ${lastMigration}`);
        } else {
          this.logger.log('No migrations to rollback');
        }
      }
    } catch (error) {
      this.logger.error('Rollback failed:', error);
      throw error;
    } finally {
      await client.end();
    }
  }

  async getMigrationStatus() {
    const client = new Client({
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      user: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_DATABASE', 'real_estate_platform'),
    });

    try {
      await client.connect();
      
      const executedMigrations = await this.getExecutedMigrations(client);
      const migrationFiles = this.getMigrationFiles();
      
      return {
        executed: executedMigrations,
        pending: migrationFiles.filter(file => !executedMigrations.includes(file)),
      };
    } finally {
      await client.end();
    }
  }
}

// CLI execution
if (require.main === module) {
  const command = process.argv[2];
  const migrationService = new MigrationService({
    get: (key: string, defaultValue?: any) => process.env[key] || defaultValue,
  } as any);

  switch (command) {
    case 'run':
      migrationService.runMigrations()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error('Migration failed:', error);
          process.exit(1);
        });
      break;
    case 'rollback':
      const filename = process.argv[3];
      migrationService.rollbackMigration(filename)
        .then(() => process.exit(0))
        .catch((error) => {
          console.error('Rollback failed:', error);
          process.exit(1);
        });
      break;
    case 'status':
      migrationService.getMigrationStatus()
        .then((status) => {
          console.log('Migration Status:');
          console.log('Executed:', status.executed);
          console.log('Pending:', status.pending);
          process.exit(0);
        })
        .catch((error) => {
          console.error('Status check failed:', error);
          process.exit(1);
        });
      break;
    default:
      console.log('Usage: npm run migration:run|rollback|status');
      console.log('Commands:');
      console.log('  run - Run pending migrations');
      console.log('  rollback [filename] - Rollback last or specific migration');
      console.log('  status - Show migration status');
      process.exit(1);
  }
}
