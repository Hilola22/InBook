import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminIsCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    console.log(req.admin.is_creator);
    if (!req.admin || !req.admin.is_creator) {
      throw new ForbiddenException({
        message: "Admin creator pozitsiyasida emas!",
      });
    }
    return true;
  }
}
