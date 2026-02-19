import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const id = await userService.createUser(name, email);
    res.status(201).json({ message: "Usuario creado", id });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const affected = await userService.updateUser(Number(id), name, email);
    if (affected === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const affected = await userService.deleteUser(Number(id));
    if (affected === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};
