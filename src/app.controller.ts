import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('blog')
  @Render('index')
  async getPosts() {
    const message = await this.appService.getPosts();
    return { message };
  }

  @Get('blog/:post')
  @Render('post')
  async getPost(@Param('post') post) {
    const message = await this.appService.getPost(post);
    return { message };
  }
}
