import { useEffect, useState } from 'react';
import { createSignalRConnection } from '../service/signalRService';

export const useSignalR = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const hubUrl = import.meta.env.VITE_API_BASE_URL + '/Notification'
    
    useEffect(() => {
        const connection = createSignalRConnection(hubUrl);
        if(import.meta.env.VITE_API_BASE_URL){
           
            connection.start()
                .then(() => console.log("Connected to SignalR"))
                .catch(error => console.error("Connection failed:", error));
    
            connection.on("ReceiveMessage", (user: string, message: string) => {
                const newMessage = `${user}: ${message}`;
                setMessages(prevMessages => [...prevMessages, newMessage]);
            });
        }
        return () => {
            connection.stop();
        };
    }, [hubUrl]);


    return { messages };
};