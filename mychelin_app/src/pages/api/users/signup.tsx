import { NextApiRequest, NextApiResponse } from 'next'
import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import bcrypt from 'bcrypt'
const saltRounds = 10

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    email,
    password,
    confirmPassword,
    nickname,
    name,
    interest,
    introduce,
  } = req.body

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return res.status(400).json({ ok: false })
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return res.status(400).json({ ok: false })
      // const user =
      await client.user.create({
        data: {
          email,
          password: hash,
          nickname,
          name,
          interest,
          introduction: introduce,
        },
      })
      // console.log(user)
      return res.json({ ok: true })
    })
  })
}

export default withHandler('POST', handler)
