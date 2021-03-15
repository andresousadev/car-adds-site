import { Migration } from '@mikro-orm/migrations';

export class Migration20210315020818 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "car_add" drop constraint if exists "car_add_price_check";');
    this.addSql('alter table "car_add" alter column "price" type decimal(10, 2) using ("price"::decimal(10, 2));');
  }

}
