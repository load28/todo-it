export async function POST(request: Request) {
  const { access_token } = await request.json();
  if (!access_token) {
    return new Response('Bad request - Missing accessToken', { status: 400 });
  }

  const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const userInfo = await userInfoResponse.json();
  return Response.json(userInfo);
}
