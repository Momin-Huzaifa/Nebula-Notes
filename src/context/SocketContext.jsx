import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.token) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:10000", {
        auth: {
          token: user.token
        }
      });

      newSocket.on("connect", () => console.log("Socket connected:", newSocket.id));
      newSocket.on("connect_error", (err) => console.error("Socket error:", err.message));

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
