// Types
import { EnvKey } from '@app/types'

export const MESSAGES = {
  // Http request messages
  ERROR_SENDING_REQUEST: 'Error while sending request',
  MISSING_ENV: (key: EnvKey) => `The required env ${key} is missing`,

  // Context error
  CONTEXT_ERROR: (contextName: string) => `use${contextName}Context must be used within a ${contextName}Provider`
}
