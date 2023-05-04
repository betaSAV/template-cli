---
to: <%= cwd %>/<%=project%>/src/<%=name%>/entities/<%=name%>.entity.ts
force: true
skip_if: "BaseEntity"
---
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/persistence/base.entity';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: '<%= h.inflection.pluralize(name) %>' })
export class <%=Name%> extends BaseEntity {}
