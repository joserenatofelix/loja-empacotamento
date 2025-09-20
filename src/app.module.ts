// src/app.module.ts
import { Module } from '@nestjs/common';
import { PackingModule } from './packing/packing.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PackingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
