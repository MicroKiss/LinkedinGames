import { Request, Response } from "express";
const { Record } = require("../database/models");
import db from "../database/models";

export const getRecordById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);

    const record = await Record.findByPk(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecordsByGameId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const records = await db.Record.findAll({ where: { gameId: id } });

    if (records.length === 0) {
      return res.status(404).json({ message: "Records not found" });
    }

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
