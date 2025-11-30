import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:5000", {
      query: { userId },
    });

    socket.on("notification", (data) => {
      setNotifications(prev => [data, ...prev]);
    });

    return () => socket.disconnect();
  }, [userId]);

  return notifications;
}
