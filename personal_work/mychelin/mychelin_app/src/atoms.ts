import { atom, RecoilEnv } from 'recoil'
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false // duplicate err

//device size
export const deviceSize = atom({
  key: 'deviceSize',
  default: 'pc',
})

// loading full view
export const loadingFull = atom({
  key: 'loadingFull',
  default: true, // if true? loading, false? not loading
})

export const loginInfo = atom({
  key: 'loginInfo',
  default: false,
})
