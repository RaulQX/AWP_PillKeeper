import { create } from "zustand";
import { NotificationDto } from "../types/NotificationDto";

interface NotificationStore {
  notifications: NotificationDto[];
  setNotifications: (notifications: NotificationDto[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}));
