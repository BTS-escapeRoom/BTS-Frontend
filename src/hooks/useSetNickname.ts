import { useMutation } from '@tanstack/react-query'
import { apiPut } from '@/utils/api'
import { useAuthStore } from '@/features/auth/store/authStore'

type SetNicknamePayload = {
  nickname?: string
  profileImg?: string
  description?: string
}

export function useSetNickname() {
  return useMutation({
    mutationFn: async (payload: SetNicknamePayload) => {
      await apiPut('/v1/members', payload)
      await useAuthStore.getState().fetchMemberInfo()
    },
  })
}
