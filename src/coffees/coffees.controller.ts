import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto, PaginationQueryDto, UpdateCoffeeDto } from './dto';
import { ParseIntPipe, Protocol, Public } from 'src/common';
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService, //@Inject(REQUEST) private request: Request) {} // 👈
  ) { }

  @Public()
  @Get()
  findAll(
    @Protocol('http') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('protocol', protocol);
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
