---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.service.spec.ts
force: true
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%=Name%>Service } from './<%=name%>.service';
import { <%=Name%>PersistenceService } from './<%=name%>.persistence';

describe('<%=Name%>Service', () => {
  let service: <%=Name%>Service;
  let persistenceServiceMock: Partial<<%=Name%>PersistenceService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%=Name%>Service,
        { provide: <%=Name%>PersistenceService, useValue: persistenceServiceMock },
      ],
    }).compile();

    service = module.get<<%=Name%>Service>(<%=Name%>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});