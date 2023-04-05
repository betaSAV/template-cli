---
to: <%= cwd %>/<%=project%>/src/<%=name%>/entities/<%=name%>.entity.ts
force: true
skip_if: "BaseEntity"
---
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/persistence/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: '<%= h.inflection.pluralize(name) %>' })
export class <%=Name%> extends BaseEntity {}
