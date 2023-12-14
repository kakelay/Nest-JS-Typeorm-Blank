import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1702565275205 implements MigrationInterface {
  private readonly logger = new Logger($npmConfigName1702565275205.name);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE item SET  public = 1');
  }

  public async down(): Promise<void> {
    this.logger.log('Down');
  }
}
