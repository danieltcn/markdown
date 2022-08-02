import { Controller, Get, Param, Render } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  @Render('index')
  async getPosts() {
    const message = await this.appService.getPosts();
    return { message };
  }

  @Get('/:post')
  @Render('post')
  async getPost(@Param('post') post) {
    const message = await this.appService.getPost(post);
    return { message };
  }
}
