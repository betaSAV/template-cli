---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.ts
force: true
---
import { GenericController } from 'src/controller/generic.controller';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { <%=Name%>Service } from './<%=name%>.service';
import { Create<%=Name%>Dto } from './dto/create-<%=name%>.dto';
import { Update<%=Name%>Dto } from './dto/update-<%=name%>.dto';

@Controller('<%=name%>')
export class <%=Name%>Controller extends GenericController {
  constructor(private readonly <%=name%>Service: <%=Name%>Service) {
    super();
  }

  @Post()
  create(@Body() create<%=Name%>Dto: Create<%=Name%>Dto) {
    return this.<%=name%>Service.create(create<%=Name%>Dto);
  }

  @Get()
  findAll() {
    return this.<%=name%>Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.<%=name%>Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update<%=Name%>Dto: Update<%=Name%>Dto) {
    return this.<%=name%>Service.update(+id, update<%=Name%>Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.<%=name%>Service.remove(+id);
  }
}