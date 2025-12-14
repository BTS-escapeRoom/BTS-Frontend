import { apiGet } from '@/utils/api'

export type SocialType = 'KAKAO' | 'NAVER' | 'APPLE'

export type Role = 'Role.ROLE_USER' | 'Role.ROLE_ADMIN'

export type MemberInfo = {
  id: number
  profileImg: string
  nickname: string
  description: string
  socialType: SocialType
  role: Role
}

export type MemberInfoApiResponse = {
  code: string
  message: string
  data: MemberInfo
}

export async function getMemberInfo(): Promise<MemberInfo> {
  const json = await apiGet<MemberInfoApiResponse>('/v1/members/me')
  return json.data
}
