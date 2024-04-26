import { NextApiRequest, NextApiResponse } from 'next'
import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, nickname } = req.body

  const userEmail = await client.user.findUnique({
    where: {
      email,
    },
  })
  const userNick = await client.user.findFirst({
    where: {
      nickname,
    },
  })

  if (userEmail?.email === email || userNick?.nickname === nickname) {
    return res.json({
      ok: false,
      sameEmail: userEmail?.email === email,
      sameNickname: userNick?.nickname === nickname,
    })
  } else {
    return res.json({ ok: true })
  }
}

export default withHandler('POST', handler)
