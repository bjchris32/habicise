import { Habit } from "../../src/models/habit";
import { Request, Response } from 'express';
import assert from 'assert';

export const createHabit = async (req: Request, res: Response) => {
  try {
    const habit = new Habit(req.body);
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
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json(habit);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const listHabits = async (req: Request, res: Response) => {
  try {
    // TODO: filter with user id
    const habits = await Habit.find();
    if (!habits) return res.status(404).json({ message: 'Habits not found' });
    res.status(200).json(habits);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};
