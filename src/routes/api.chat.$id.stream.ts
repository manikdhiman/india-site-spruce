import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/chat/$id/stream')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const encoder = new TextEncoder();
        
        // Setting up a standard ReadableStream to handle Server-Sent Events (SSE)
        const customStream = new ReadableStream({
          async start(controller) {
            const reply = "Hey Manik! Your TanStack Start backend routing is completely hooked up and operational now.";
            const words = reply.split(" ");
            
            for (const word of words) {
              const payload = `data: ${JSON.stringify({ text: word + " " })}\n\n`;
              controller.enqueue(encoder.encode(payload));
              // Simulating a typing latency delay
              await new Promise((resolve) => setTimeout(resolve, 150));
            }
            
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          },
        });

        return new Response(customStream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      },
    },
  },
});