import { startCase } from 'lodash';
import { MyError } from '../../config/errors';

const REG_EXP = /"([^"]+)"/;

export const convertToErrorObj = (err: string): MyError => {
  const key = err.match(REG_EXP)?.[1];
  return {
    key: key ?? 'error',
    message: err.replace(REG_EXP, startCase(key)),
  };
};
