export async function POST(request: Request) {
  const { accessToken } = await request.json();
  if (!accessToken) {
    return new Response('Bad request - Missing accessToken', { status: 400 });
  }

  const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const userInfo = await userInfoResponse.json();
  return Response.json(userInfo);
}
