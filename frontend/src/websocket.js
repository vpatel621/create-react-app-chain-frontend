export default function initializeWebSocketConnection(ws, url) {
  ws.current = new WebSocket(url);
  ws.current.onopen = () => console.log('ws opened');
  ws.current.onclose = () => console.log('ws closed');

  return () => {
    ws.current.close();
  };
}
