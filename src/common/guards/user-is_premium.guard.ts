import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserIsPremiumGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    console.log(req.user.is_premium);
    if (!req.user || !req.user.is_premium) {
      throw new ForbiddenException({
        message: "Bu foydalanuvchida premium obunasi mavjud emas!",
      });
    }
    return true;
  }
}
