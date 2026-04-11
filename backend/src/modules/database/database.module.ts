import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { SeedService } from './services/seed.service';

@Module({
  imports: [UsersModule],
  providers: [SeedService],
})
export class DatabaseModule {}
