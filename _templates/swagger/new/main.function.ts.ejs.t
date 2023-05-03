---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "bindSwaggerDocument "
after: "}\n"
---
const bindSwaggerDocument = (path: string, app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API title')
    .setDescription("API description")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
