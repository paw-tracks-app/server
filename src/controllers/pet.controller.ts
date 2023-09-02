import petService from '../services/pet.service';
import { requestHandler } from '../utils/requestHandler';

const create = requestHandler(async (req, res) => {
  const createdPet = await petService.create(req.body.name, req.user!.id);
  res.ok(createdPet);
});

const mine = requestHandler(async (req, res) => {
  const myPets = await petService.mine(req.user!.id);
  res.ok(myPets);
});

export default {
  create,
  mine,
};
