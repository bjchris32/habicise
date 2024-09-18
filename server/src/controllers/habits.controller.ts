import { Habit, IHabit } from "../../src/models/habit";
import { Request, Response } from 'express';
import assert from 'assert';

export const createHabit = async (req: Request, res: Response) => {
  try {
    const habit = new Habit(req.body);
    if(req.user) {
      habit.user = req.user._id
    }
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    assert(error instanceof Error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getHabit = async (req: Request, res: Response) => {
  try {
    var habit: IHabit | null = null;
    if(req.user) {
      habit = await Habit.where({ _id: req.params.id, user: req.user._id }).findOne()
    }
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json(habit);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const listHabits = async (req: Request, res: Response) => {
  try {
    var habits: IHabit[] | null = null;
    if(req.user) {
      habits = await Habit.where({ user: req.user._id }).find().sort('createdAt')
    }
    if (!habits) return res.status(404).json({ message: 'Habits not found' });
    res.status(200).json(habits);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    var habit: IHabit | null = null;
    if(req.user) {
      habit = await Habit.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    }
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json(habit);
  } catch (error) {
    assert(error instanceof Error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    var habit: IHabit | null = null;
    if(req.user) {
      habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    }
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};
