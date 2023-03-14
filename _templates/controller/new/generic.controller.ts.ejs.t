---
to: <%= cwd %>/src/controller/generic.controller.ts
force: true
---
import { ApiResponse } from '@nestjs/swagger';

@ApiResponse({ status: 401, description: 'Authentication may be required.' })
@ApiResponse({
  status: 403,
  description: 'The user has no permissions to execute this endpoint',
})
@ApiResponse({ status: 500, description: 'Internal server error' })
export abstract class GenericController {}
