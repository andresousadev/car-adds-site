import { Migration } from '@mikro-orm/migrations';

export class Migration20210317213225 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" text not null, "last_name" text not null, "user_email" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_user_email_unique" unique ("user_email");');

    this.addSql('create table "car_add" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "brand" text not null, "model" text not null, "price" decimal(10, 2) not null);');
  }

}
