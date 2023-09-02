const get = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env Variable ${key}`);
  return value;
};

const getOptional = (key: string, defaultValue: string) => {
  return process.env[key] || defaultValue;
};

export default {
  nodeEnv: getOptional('NODE_ENV', 'development') as
    | 'development'
    | 'production'
    | 'test',
  port: getOptional('PORT', '3001'),
  jwtSecret: get('JWT_SECRET'),
};
