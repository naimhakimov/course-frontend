import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jsonwebtoken from 'jsonwebtoken'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const buildUser = (user) => {
  const userClone = JSON.parse(JSON.stringify((user)))
  delete userClone.password
  return {
    user: {
      ...userClone
    },
    token: jsonwebtoken.sign(userClone, 'super secret', {
      expiresIn: '7d'
    })
  }
}