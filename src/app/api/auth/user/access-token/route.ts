import { NextRequest } from 'next/server';
import { getServerEnvValue } from '@/app/@core/providers/Env.server';

export async function GET(req: NextRequest) {
  const { NEXT_PUBLIC_AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, NEXT_PUBLIC_APP_HOST } = await getServerEnvValue();
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter.', { status: 500 });
  }

  const params = new URLSearchParams({
    code,
    client_id: NEXT_PUBLIC_AUTH_GOOGLE_ID,
    client_secret: AUTH_GOOGLE_SECRET,
    redirect_uri: `${NEXT_PUBLIC_APP_HOST}/google-signup`,
    grant_type: 'authorization_code',
  });

  // 토큰 교환
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();

  if (data.error) {
    return new Response(data.error, { status: 500 });
  }

  return Response.json({ access_token: data.access_token });
}
