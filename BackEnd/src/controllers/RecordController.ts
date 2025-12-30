import { Request, Response } from "express";
const { Record } = require("../database/models");
import db from "../database/models";
import { UniqueConstraintError } from "sequelize";

export const getRecordById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);

    const record = await Record.findByPk(id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getRecordsByGameId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const records = await db.Record.findAll({ where: { gameId: id } });

    if (records.length === 0) {
      return res.status(404).json({ error: "Records not found" });
    }

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ r: "Server error" });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.body.gameId == null || req.body.time == null) {
      return res.status(400).json({ error: "GameId and time are required" });
    }
    if (typeof req.body.time !== "number" || req.body.time <= 0) {
      return res
        .status(400)
        .json({ error: "Time must be a positive number" });
    }
    const newRecord = await Record.create({
      userId: req.user.id,
      gameId: req.body.gameId,
      time: req.body.time,
      date: Date.now(),
    });
    res.status(201).json(newRecord);
  } catch (err) {
    console.error(err);
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        error: "Record already exists for this user and game for today",
      });
    }
    res.status(500).json({ error: "Server error" });
  }
};
