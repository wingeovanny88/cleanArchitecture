import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context);
    // Lógica de autorización: por ejemplo, verificar un token o rol
    return true; // Permite todas las solicitudes en este ejemplo
  }
}
