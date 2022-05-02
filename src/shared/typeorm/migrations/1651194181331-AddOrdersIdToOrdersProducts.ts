import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddOrdersIdToOrdersProducts1651194181331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductsOrder',
        columnNames: ['order_id'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // nome da tabela, nome da foreign key
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
    // nome da tabela, campo a ser deletado
    await queryRunner.dropColumn('orders_products', 'order_id');
  }
}
