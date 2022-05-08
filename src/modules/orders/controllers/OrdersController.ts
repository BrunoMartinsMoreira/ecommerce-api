import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService';

export class OrdersController {
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
