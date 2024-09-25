import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  console.log(req);
  const code = req.query.code;

  if (!code) {
    return new Response('Missing code parameter.', { status: 500 });
  }

  const client_id = process.env.AUTH_GOOGLE_ID;
  const client_secret = process.env.AUTH_GOOGLE_SECRET;
  const redirect_uri = 'http://localhost:3000/signup';

  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code',
  });

  // 토큰 교환
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await response.json();

  if (data.error) {
    return new Response(data.error, { status: 500 });
  }

  const { access_token } = data;

  // Access token을 사용하여 유저 정보 요청
  const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
  const userInfoResponse = await fetch(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userInfo = await userInfoResponse.json();

  return Response.json(userInfo);
}