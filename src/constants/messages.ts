// Types
import { EnvKey } from '@app/types'

export const MESSAGES = {
  // Http request messages
  ERROR_SENDING_REQUEST: 'Error while sending request',
  MISSING_ENV: (key: EnvKey) => `The required env ${key} is missing`
}
