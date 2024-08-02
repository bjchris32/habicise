import * as habits from '../controllers/habits'

/**
 * Expose routes
 */

import { Router } from 'express';

const router = Router();

router.post('/habits', habits.createHabit);
router.get('/habits/:id', habits.getHabit);
router.get('/habits', habits.listHabits);
router.put('/habits/:id', habits.updateHabit);
router.delete('/habits/:id', habits.deleteHabit);

export default router;
