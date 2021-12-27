import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Lucky Challenge')
    .setDescription('The Lucky Challenge API.')
    .setVersion('1.0')
    .setContact('Leandro Gutierrez', null, 'leandrogutierrez070@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
