import { Router } from 'express';
import passport from 'passport';
import { authController } from '../modules/auth/auth.module';

export const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and sets JWT tokens in cookies
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Bad Request (invalid credentials)
 */
authRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh the user's JWT access token
 *     description: Refresh the JWT token using the refresh token stored in cookies
 *     operationId: refreshToken
 *     responses:
 *       200:
 *         description: Token successfully refreshed
 *       401:
 *         description: Unauthorized (invalid refresh token)
 */
authRouter.post(
  '/refresh-token',
  passport.authenticate('jwt-refresh', { session: false }),
  authController.refreshToken,
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user and returns their information
 *     operationId: register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Bad Request (invalid input)
 */
authRouter.post('/register', authController.register);
