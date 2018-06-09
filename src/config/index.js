import EnvConfig from './env.config'
import ApiConfig from './api.config'
import ImageConfig from './image.config'

import { disposeSrc, disposeUrl} from '@/util/tools'

const env = 'prod' // 'dev' or 'prod'
const appid = 'wxd8bd54ab9f6ca53d' // wx80b8f9e77495d867
const image = disposeSrc(ImageConfig, EnvConfig[env].imageDomain)
const api = disposeUrl(ApiConfig, EnvConfig[env].apiDomain)
export default {
  env,
  api,
  image,
  socket: EnvConfig[env].socketDomain
}
