import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles = ['admin', 'user', 'writer', 'manager'];

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if(!user)
      throw new BadRequestException('User not found');

    //console.log()

    for (const role of user.roles) {
      if(validRoles.includes(role))
        return true;

    }

    throw new ForbiddenException(`User does not have the required roles: ${validRoles.join(", ")}`);
  }
}
