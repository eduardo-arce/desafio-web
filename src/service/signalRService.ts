import * as signalR from '@microsoft/signalr';

export const createSignalRConnection = (hubUrl: string) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, 
        )
        .build();

    return connection;
};