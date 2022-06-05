import { DataSource } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1647817821655 } from './migrations/1647817821655-CreateProducts';
import { CreateUsers1648089408055 } from './migrations/1648089408055-CreateUsers';
import { CreateUserTokens1648770644440 } from './migrations/1648770644440-CreateUserTokens';
import { CreateCustomers1650586498093 } from './migrations/1650586498093-CreateCustomers';
import { CreateOrders1651192481856 } from './migrations/1651192481856-CreateOrders';
import { AddCustomerIdToOrders1651192861837 } from './migrations/1651192861837-AddCustomerIdToOrders';
import { CreateOrdersProducts1651193757868 } from './migrations/1651193757868-CreateOrdersProducts';
import { AddOrdersIdToOrdersProducts1651194181331 } from './migrations/1651194181331-AddOrdersIdToOrdersProducts';
import { AddProductsIdToOrdersProducts1651194648999 } from './migrations/1651194648999-AddProductsIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1647817821655,
    CreateUsers1648089408055,
    CreateUserTokens1648770644440,
    CreateCustomers1650586498093,
    CreateOrders1651192481856,
    AddCustomerIdToOrders1651192861837,
    CreateOrdersProducts1651193757868,
    AddOrdersIdToOrdersProducts1651194181331,
    AddProductsIdToOrdersProducts1651194648999,
  ],
});
