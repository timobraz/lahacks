import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
    const response = await fetch('https://e924-68-181-16-217.ngrok-free.app/orchestrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "user_id": 1
        }),
      });

      const data = await response.json();
      return NextResponse.json(data);
}