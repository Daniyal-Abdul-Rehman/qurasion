import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-request-id'] || generateRequestId();
  },
);

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
