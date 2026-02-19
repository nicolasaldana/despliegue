import { Request, Response, NextFunction } from "express";
import * as roomService from "../services/room.service";
import { roomSchema } from "../schemas/room.schema";


export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rooms]: any = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [[room]]: any = await roomService.getRoomById(Number(id));
    if (!room) return res.status(404).json({ message: "Sala no encontrada" });
    res.json(room);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = roomSchema.parse(req.body);

    const roomId = await roomService.createRoom(data.name, data.capacity);

    res.status(201).json({
      message: "Sala creada",
      id: roomId
    });
  } catch (error) {
    next(error);
  }
};


export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await roomService.updateRoom(Number(id), data, data.capacity);

    if (!updated) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    res.json({ message: "Sala actualizada" });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result: any = await roomService.deleteRoom(Number(id));
    if (result.affectedRows === 0) return res.status(404).json({ message: "Sala no encontrada" });
    res.json({ message: "Sala eliminada" });
  } catch (error) {
    next(error);
  }
};

