import { refresh, refreshVerify, sign, signVerify } from '@/utils/jwtUtils'
import { NextApiRequest, NextApiResponse } from 'next'

/*
case1 : access token과 refresh token 모두가 만료된 경우 → 에러 발생 (재 로그인하여 둘다 새로 발급)
case2 : access token은 만료됐지만, refresh token은 유효한 경우 →  refresh token을 검증하여 access token 재발급
case3 : access token은 유효하지만, refresh token은 만료된 경우 →  access token을 검증하여 refresh token 재발급
case4 : access token과 refresh token 모두가 유효한 경우 → 정상 처리
*/
const getAccessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  // const res = new NextResponse()
  const { email, accessToken, refreshToken }: any = req.cookies
  // console.log('req ', req, 'res ', res)
  try {
    const accessVeri = await signVerify(accessToken) // { ok: true, userId: email } or { ok: false, massage:'jwt expired'}
    const refreshVeri = await refreshVerify(refreshToken) // true or false
    const accessTokenRe = sign(email)

    if (!accessVeri.ok && !refreshVeri) {
      // case 1
      return { ok: false, case: 1, data: { email: '', accessToken: '' } }
    } else if (!accessVeri.ok && refreshVeri) {
      // case 2
      return {
        ok: true,
        case: 2,
        data: { email, accessToken: accessTokenRe },
      }
    } else if (accessVeri.ok && !refreshVeri) {
      // case 3
      const refreshTokenRe = refresh(email)
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${refreshTokenRe}; Path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3,
        ).toUTCString()}; HttpOnly`,
      )

      return {
        ok: true,
        case: 3,
        data: { email, accessToken: accessTokenRe },
      }
    } else {
      // case 4
      return {
        ok: true,
        case: 4,
        data: { email, accessToken: accessTokenRe },
      }
    }
  } catch (error) {
    console.log('token error', error)
    return { ok: false, error }
  }
}
export default getAccessToken
