import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
import {decodeToken, verifyToken} from '../common/utils';  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try { 
        const valid = await verifyToken(token);
        if(valid) {
            const decode: any = await decodeToken(token);
            request['user'] = decode;
        }
        else{
            throw new UnauthorizedException();
        }
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }