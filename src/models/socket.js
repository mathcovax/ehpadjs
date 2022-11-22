import { Server, Socket } from "socket.io"

/**
 * @param {Socket} socket
 * @return {(Boolean | String)}
 */
export function access(socket){
    return true
}

/**
 * @param {Socket} socket 
 */
export function client(socket){
    
}

/**
 * 
 * @param {Socket} socket 
 * @param {Server} io 
 */
export function server(socket, io){

}