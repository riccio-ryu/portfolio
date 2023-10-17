import { atom, RecoilEnv } from 'recoil'
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false // duplicate err

export const deviceSize = atom({
  key: 'deviceSize',
  default: 'pc',
})
