import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { ListOrdersService } from '../services/ListOrdersService';
import { ShowOrderService } from '../services/ShowOrderService';

export class OrdersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listOrdersService = new ListOrdersService();

    const orders = await listOrdersService.execute();

    return res.json(orders);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute({ id });

    return res.json(order);
  }

  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return res.json(order);
  }
}
