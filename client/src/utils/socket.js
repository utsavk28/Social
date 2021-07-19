import { io } from 'socket.io-client';
import url from './api';

const socket = io(url);

export default socket;
