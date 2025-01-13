import { useQuery } from "@tanstack/react-query";
import { NotificationDto } from "../types/NotificationDto";
import { useUser } from "../contexts/UserContext";

export const useNotifications = () => {
  const { user } = useUser();

  return useQuery<NotificationDto[]>({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No user email");

      const response = await fetch(
        `https://localhost:7001/api/notifications/user/${encodeURIComponent(
          user.email
        )}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      return response.json();
    },
    enabled: !!user?.email, // Only run query when we have a user email
  });
};
