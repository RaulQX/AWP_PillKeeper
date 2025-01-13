import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationDto } from "../types/NotificationDto";

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification: NotificationDto) => {
      const response = await fetch(
        `https://localhost:7001/api/notifications/${notification.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(notification),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update notification: ${errorText}`);
      }

      // Return the updated notification
      return notification;
    },
    onSuccess: (updatedNotification) => {
      // Immediately update the cache with the new value
      queryClient.setQueryData<NotificationDto[]>(
        ["notifications", updatedNotification],
        (old) =>
          old?.map((n) =>
            n.id === updatedNotification.id ? updatedNotification : n
          )
      );

      // Then invalidate to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ["notifications", updatedNotification],
      });
    },
  });
};
