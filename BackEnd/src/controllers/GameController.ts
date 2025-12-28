import { Request, Response } from "express";
const { Game } = require("../database/models");

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await Game.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
