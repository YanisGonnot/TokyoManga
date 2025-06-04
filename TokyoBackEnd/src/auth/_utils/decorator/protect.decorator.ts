import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProtectedAutoRolesDecorator } from './protected-auto-roles.decorator';
import { JwtAuthGuard } from '../../strategy/jwt-auth.guard';
import { UserRoleEnum } from 'src/users/_utils/user-role.enum';

export function Protect(...roles: UserRoleEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ProtectedAutoRolesDecorator(...roles),
  );
}
