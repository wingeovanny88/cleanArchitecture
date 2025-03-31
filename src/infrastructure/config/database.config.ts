export const databaseConfig = {
  type: 'sqlite',
  database: process.env.DB_NAME || 'database.sqlite',
  entities: [__dirname + '/../adapters/database/*.orm.entity.{js,ts}'],
  synchronize: true,
};
