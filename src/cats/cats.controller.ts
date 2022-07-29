import { Controller, Get, Header, HttpCode, Param, Post, Query, Redirect } from "@nestjs/common";
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  creat(): string {
    return 'this action adds a new cat';
  }
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('aa') //위에서 부터 읽어 내려오면 일치하는 핸들러를 실행시키기 때문에 요청 path가 path variable보다 위에 있어야함
  findAll2(@Query() query: CreateCatDto) {
    return `this ${query.name}, ${query.age}, ${query.breed}`;
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `this action return a #${params.id} cat`;
  }

  @Get('tt')
  getTT(@Param() params): string {
    return `${params.id}`;
  }
}
