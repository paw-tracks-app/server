import AuthService from '../services/auth.service';
import { requestHandler } from '../utils/requestHandler';

const currentUser = requestHandler(async (req, res) => {
  res.ok(req.user);
});

const login = requestHandler(async (req, res) => {
  const user = await AuthService.login(req.body);
  req.user = { ...user, isExpired: true };
  res.ok(user);
});

const register = requestHandler(async (req, res) => {
  const user = await AuthService.register(req.body);
  req.user = { ...user, isExpired: true };
  res.ok(user);
});

export default { currentUser, login, register };
