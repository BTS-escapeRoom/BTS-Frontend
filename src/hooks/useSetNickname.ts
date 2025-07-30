import { useMutation } from '@tanstack/react-query'
import { fetcher } from '@/utils/fetcher'

type SetNicknamePayload = {
  nickname?: string
  profileImg?: string
  description?: string
}

export function useSetNickname() {
  return useMutation({
    mutationFn: (payload: SetNicknamePayload) =>
      fetcher('/v1/members', {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
  })
}
