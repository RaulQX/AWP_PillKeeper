import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { NotificationDto } from "../types/NotificationDto";

export const notificationToProcessedEvent = (
  notification: NotificationDto
): ProcessedEvent => {
  const start = new Date(notification.date);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);
  console.log(notification);
  return {
    event_id: notification.id?.toString() || "",
    title: notification.title,
    start,
    end,
    description: notification.subtitle || undefined,
    draggable: true,
    editable: true,
    color: notification.color,
  };
};

export const notificationsToProcessedEvents = (
  notifications: NotificationDto[]
): ProcessedEvent[] => {
  return notifications.map(notificationToProcessedEvent);
};
