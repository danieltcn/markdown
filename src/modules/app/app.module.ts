import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
