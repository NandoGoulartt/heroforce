import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'bruce@heroforce.com';

    const existingAdmin = await this.usersService.findByEmail(adminEmail);

    if (existingAdmin) {
      this.logger.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    await this.usersService.create({
      name: 'Bruce Wayne',
      email: adminEmail,
      password: hashedPassword,
      character: 'Batman',
      role: UserRole.ADMIN,
    });

    this.logger.log('Admin user created successfully');
  }
}
