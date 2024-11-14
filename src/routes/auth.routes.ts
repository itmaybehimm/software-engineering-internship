import { Router } from 'express';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  res.json(req.user);
});
