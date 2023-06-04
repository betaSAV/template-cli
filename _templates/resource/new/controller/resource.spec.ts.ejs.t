---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.spec.ts
force: true
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%=Name%>Controller } from './<%=name%>.controller';
import { <%=Name%>Service } from './<%=name%>.service';
import { <%=Name%>PersistenceService } from './<%=name%>.persistence';

describe('<%=Name%>Controller', () => {
  let controller: <%=Name%>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%=Name%>Controller],
      providers: [
        <%=Name%>Service,
        {
          provide: <%=Name%>PersistenceService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<<%=Name%>Controller>(<%=Name%>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
