import * as auths from '../controllers/auths.controller'
import * as habits from '../controllers/habits.controller'
import * as commits from '../controllers/commits.controller'
import { authenticate } from '../middlewares/auth.middleware'

/**
 * Expose routes
 */

import { Router } from 'express';

const router = Router();

// auth
router.post('/register', auths.registerUser);
router.post('/login', auths.authenticateUser);
router.post('/logout', auths.logoutUser);
router.get('/auth/check', authenticate, auths.authCheckUser);
router.use('/habits', authenticate);
router.use('/commits', authenticate);
router.use('/habit', authenticate);

router.post('/habits', habits.createHabit);
router.get('/habits/:id', habits.getHabit);
router.get('/habits', habits.listHabits);
router.put('/habits/:id', habits.updateHabit);
router.delete('/habits/:id', habits.deleteHabit);

router.post('/commits', commits.createCommit);
router.get('/commits/:id', commits.getCommit);
router.get('/habit/:id/commits', commits.listCommits);
router.get('/habit/:id/commitsByDate', commits.listCommitsByDate);
router.put('/commits/:id', commits.updateCommit);
router.delete('/commits/:id', commits.deleteCommit);

export default router;
