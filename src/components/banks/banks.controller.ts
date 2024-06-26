import { AuthGuard } from '@config/guard/auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksDto } from '@models/dtos/banks.dto';

@UseGuards(AuthGuard)
@Controller('banks')
export class BanksController {
    constructor(private bankService: BanksService) {};

    @Get('/list')
    async list(@Req() request: Request, @Res() response: Response): Promise<any> {
        const list = await this.bankService.getAll();
        return {
            message: 'Bank List',
            data: list
        }        
    }

    @Post('/')
    async create(@Body() body: BanksDto, @Req() request: Request, @Res() response: Response): Promise<any> {
        const Bank = await this.bankService.create({...body, createdBy: request['user']?._id});
        return {
            message: 'Bank Created Successfully',
            data: Bank
        }
    }

    @Put('/:id')
    async update(@Body() body: BanksDto,@Param() params: any, @Req() request: Request, @Res() response: Response): Promise<any> {
        const {id} = params
        const details = await this.bankService.update(id, body);
        return {
            message: 'Bank Updated Successfully',
            data: details
        }
    }

    @Get('/details/:id')
    async details(@Param() params: any, @Req() request: Request, @Res() response: Response): Promise<any> {
        const {id} = params
        const details = await this.bankService.get(id);
        return {
            message: 'Bank Details',
            data: details
        }
    }

    @Delete('/:id')
    async remove(@Param() params: any, @Req() request: Request, @Res() response: Response): Promise<any> {
        const {id} = params
        const details = await this.bankService.deleteOne(id);
        return {
            message: 'Bank Deleted Successfully',
            data: details
        }
    }

}

