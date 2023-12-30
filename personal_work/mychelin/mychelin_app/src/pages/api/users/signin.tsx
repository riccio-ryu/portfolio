import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import client from '@/libs/server/client'
import { sign, refresh } from '@/utils/jwtUtils'
import bcrypt from 'bcrypt'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, password } = req.body
  const user = await client.user.findUnique({
    where: {
      email: email,
    },
  })
  bcrypt.compare(password, user?.password as string, async (err, same) => {
    if (same) {
      const refreshToken = refresh(email)
      const accessToken = sign(email)

      // update token refresh  ->  Data.user.updateDB(userId, refreshToken);
      // DB - planetscale에 등록된 토큰을 재설정한다.
      // Data.user.updateDB(userId, refreshToken);

      await client.user.update({
        where: {
          email: email,
        },
        data: {
          tokens: refreshToken,
        },
      })

      res.setHeader(
        'Set-Cookie',
        `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3,
        ).toUTCString()}; HttpOnly`,
      )

      return res.json({ ok: true, userId: email, accessToken: accessToken })
    } else {
      return res.json({ ok: false })
    }
  })
}

export default withHandler('POST', handler)
