import * as habits from '../controllers/habits'

/**
 * Expose routes
 */

import { Router } from 'express';

const router = Router();

router.post('/habits', habits.createHabit);
router.get('/habits/:id', habits.getHabit);

export default router;
