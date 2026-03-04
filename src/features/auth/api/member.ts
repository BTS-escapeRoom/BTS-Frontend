import { apiDelete, apiGet } from '@/utils/api'

export type SocialType = 'KAKAO' | 'NAVER' | 'APPLE'

export type Role = 'Role.ROLE_USER' | 'Role.ROLE_ADMIN'

export type MemberInfo = {
  id: number
  profileImg: string
  nickname: string
  description: string
  socialType: SocialType
  role: Role
  createdAt?: string | null
}

export type MemberInfoApiResponse = {
  code: string
  message: string
  data: MemberInfo
}

type DeleteMemberApiResponse = {
  code: string
  message: string
}

export async function getMemberInfo(): Promise<MemberInfo> {
  const json = await apiGet<MemberInfoApiResponse>('/v1/members/me')
  return json.data
}

export async function deleteMember(): Promise<void> {
  await apiDelete<DeleteMemberApiResponse>('/v1/members')
}
