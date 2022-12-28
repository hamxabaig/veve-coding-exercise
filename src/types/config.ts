export type Config = {
  jwt: {
    secret: string;
    expiryPeriod: string;
  };
  database: {
    password: string;
    host: string;
    db: string;
    user: string;
  };
};
