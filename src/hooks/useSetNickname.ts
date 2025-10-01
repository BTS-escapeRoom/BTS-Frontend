import { useMutation } from '@tanstack/react-query'
import { apiPut } from '@/utils/api'

type SetNicknamePayload = {
  nickname?: string
  profileImg?: string
  description?: string
}

export function useSetNickname() {
  return useMutation({
    mutationFn: (payload: SetNicknamePayload) =>
      apiPut('/v1/members', {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
  })
}
