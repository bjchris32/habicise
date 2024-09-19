import { Commit, ICommit } from "../../src/models/commit";
import { Request, Response } from 'express';
import assert from 'assert';
import mongoose from 'mongoose';

export const createCommit = async (req: Request, res: Response) => {
  try {
    const commit = new Commit(req.body);
    const savedCommit = await commit.save();
    res.status(201).json(savedCommit);
  } catch (error) {
    assert(error instanceof Error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getCommit = async (req: Request, res: Response) => {
  try {
    const commit = await Commit.findById(req.params.id);
    if (!commit) return res.status(404).json({ message: 'Commit not found' });
    res.status(200).json(commit);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const listCommits = async (req: Request, res: Response) => {
  try {
    // TODO: filter with user id
    const commits = await Commit.find({ habit: req.params.id });
    if (!commits) return res.status(404).json({ message: 'Commits not found' });
    res.status(200).json(commits);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const listCommitsByDate = async (req: Request, res: Response) => {
  try {
    // TODO: only show the past one year
    const commitsByDate = await Commit.aggregate([
      { $match : { habit: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date for consistency in results
      },
    ]);

    if (!commitsByDate) return res.status(404).json({ message: 'commitsByDate not found' });
    res.status(200).json(commitsByDate);
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};

export const updateCommit = async (req: Request, res: Response) => {
  try {
    const commit = await Commit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commit) return res.status(404).json({ message: 'Commit not found' });
    res.status(200).json(commit);
  } catch (error) {
    assert(error instanceof Error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommit = async (req: Request, res: Response) => {
  try {
    const commit = await Commit.findByIdAndDelete(req.params.id);
    if (!commit) return res.status(404).json({ message: 'Habit not found' });
    res.status(200).json({ message: 'Commit deleted successfully' });
  } catch (error) {
    assert(error instanceof Error)

    res.status(400).json({ message: error.message });
  }
};
