import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { deleteCookie } from 'cookies-next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  try {
    const { refreshToken } = req.cookies
    res.setHeader(
      'Set-Cookie',
      `refreshToken=; Path=/; Expires=${new Date(
        Date.now() - 1,
      ).toUTCString()}; HttpOnly`,
    )
    deleteCookie('accessToken')
    deleteCookie('email')
    if (refreshToken) {
      // await Data.user.updateDBByToken(refreshToken); // DB에서 토큰 업데이트
      return res.json({ ok: true, msg: '로그아웃 완료' })
    }
    return res.json({ ok: true, msg: '이미 로그아웃이 완료되었습니다.' })
  } catch (error) {
    return res.json({ ok: false, msg: error })
  }
}

export default withHandler('POST', handler)
