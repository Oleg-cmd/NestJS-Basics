import { Product } from './schemas/product.schema';
import { Delete, HttpCode, HttpStatus, Redirect } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Header } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Post, Put } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Response, Request} from 'express'
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    // @Get()
    // getAll(@Req() req: Request, @Res() res: Response):string{
        // res.status(201).end('its end')
    //     return 'getAll';
    // }


    constructor (private readonly productsService: ProductsService) {

    }



    @Get()
    getAll(): Promise<Product[]>{
        return this.productsService.getAll()
    }

    // @Redirect('https://google.com', 301)
    @Get(':id')
    getOne(@Param('id') id:string): Promise<Product>{
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto){
        return this.productsService.create(createProductDto)
    }
    

    @Delete(':id') 
    remove(@Param('id') id:string): Promise<Product>{
        return this.productsService.remove(id)

    }


    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id:string): Promise<Product>{
        return this.productsService.update(id, updateProductDto)
    }
}
