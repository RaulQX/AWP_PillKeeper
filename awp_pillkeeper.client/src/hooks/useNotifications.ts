import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNotificationStore } from "../stores/notificationStore";
import { useUser } from "../contexts/UserContext";
import { NotificationDto } from "../types/NotificationDto";

interface UserWithNotifications {
  id: number;
  email: string;
  name: string;
  notifications: NotificationDto[];
}

export const useNotifications = () => {
  const { user } = useUser();
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  return useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No user email");
      const encodedEmail = encodeURIComponent(user.email);
      const response = await axios.get<UserWithNotifications>(
        `http://localhost:7001/api/users/${encodedEmail}`
      );
      setNotifications(response.data.notifications);
      return response.data;
    },
    enabled: !!user?.email,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    staleTime: 0, // Consider data always stale
    retry: 3, // Retry failed requests 3 times
  });
};
