import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import readMarkdown from 'read-markdown';

import { readFile } from 'fs-extra';
import * as matter from 'gray-matter';
import * as showdown from 'showdown';

@Injectable()
export class BlogService {
  async getPost(postKC: string) {
    const posts = await this.getPosts();
    const existPost = posts.find(
      (post) => post.keysWithoutExt === postKC,
    )?.fullDir;

    if (!existPost) throw new NotFoundException('Hola post');

    const file = readFile(existPost, 'utf8');
    const strFile = await file
      .then((result) => {
        const data = matter(result);
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data.content);

        return html;
      })
      .catch(console.error);

    return strFile;
  }

  async getPosts() {
    const dir = join(__dirname, '../..', 'posts/').replace(/\\/g, '/');

    const mark = await readMarkdown(join(__dirname, '../..', 'posts/*.md'))
      .then(function (data) {
        const keys = Object.keys(data).map((key) => {
          const keysKebab = kebabCase(key, dir);
          return { keysKebab, fullDir: key };
        });
        const keysWithoutExtension = keys.map((key) => {
          const keysWithoutExt = removeExtension(key.keysKebab);

          return { keysWithoutExt, fullDir: key.fullDir };
        });
        return keysWithoutExtension;
      })
      .catch(console.error);
    return mark;

    function removeExtension(filename) {
      return filename.substring(0, filename.lastIndexOf('.')) || filename;
    }
    function kebabCase(str, dir) {
      return str
        .replace(dir, '')
        .replace(/[^a-zA-Z0-9.\- ]/g, '')
        .toLowerCase()
        .replace(/\s/g, '-');
    }
  }

  private kebabCase(str) {
    return str
      .replace(/[^a-zA-Z0-9.\- ]/g, '')
      .toLowerCase()
      .replace(/\s/g, '-');
  }

  private removeExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
  }
}
