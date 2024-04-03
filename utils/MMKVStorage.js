import { MMKV } from 'react-native-mmkv'

// Can create a new instance for the logged in users storage such that
// we can have global token and local recents list

export const storage = new MMKV({
  id: 'global',
  encryptionKey: 'rambo1232323' //Needs to be Env variable
})