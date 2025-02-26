import { useMutation } from "@tanstack/react-query";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserContext";
import { useNotificationStore } from "../stores/notificationStore";
import { NotificationDto } from "../types/NotificationDto";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

interface DecodedCredential {
  email: string;
  name: string;
  picture: string;
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  picture: string;
  notifications: NotificationDto[];
}

export const useGoogleAuth = () => {
  const { setUser } = useUser();
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  const registerUser = async (credential: string) => {
    console.log("Starting registerUser with credential");
    const decoded: DecodedCredential = jwtDecode(credential);
    console.log("Decoded credential:", decoded);

    const user: GoogleUser = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };
    console.log("Attempting to find user:", user);

    try {
      const response = await fetch(
        `https://localhost:7001/api/users/email/${encodeURIComponent(
          user.email
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log("GET response status:", response.status);

      if (response.status === 404) {
        console.log(
          "User not found, creating new user with data:",
          JSON.stringify(user)
        );
        const createResponse = await fetch("https://localhost:7001/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        });

        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          console.error("Create user failed:", errorText);
          throw new Error(`Failed to create user: ${errorText}`);
        }
        return { ...(await createResponse.json()), picture: user.picture };
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get user: ${errorText}`);
      }

      return { ...(await response.json()), picture: user.picture };
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  };

  const mutation = useMutation<UserResponse, Error, GoogleCredentialResponse>({
    mutationFn: (response: GoogleCredentialResponse) => {
      console.log("Google response:", response);
      if (!response.credential) {
        throw new Error("No credential received");
      }
      return registerUser(response.credential);
    },
    onSuccess: (data) => {
      console.log("Mutation success, setting user:", data);
      setNotifications(data.notifications);
      setUser({
        name: data.name,
        email: data.email,
        image: data.picture,
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return mutation;
};
