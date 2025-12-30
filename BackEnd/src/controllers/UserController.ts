import { Request, Response } from "express";
const { User } = require('../database/models');

export const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}