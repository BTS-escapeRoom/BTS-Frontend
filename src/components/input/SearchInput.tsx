'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import IconSearch from '@/components/icons/Search'
import IconInputCancel from '@/components/icons/InputCancel'

interface SearchInputProps {
  placeholder?: string
  searchParamKey?: string
  basePath?: string
}

export default function SearchInput({
  placeholder = '원하는 테마 또는 업체명 검색',
  searchParamKey = 'keyword',
  basePath = '/theme',
}: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // URL에서 keyword 파라미터를 읽어와서 초기값 설정
  useEffect(() => {
    const urlKeyword = searchParams.get(searchParamKey) || ''
    setKeyword(urlKeyword)
  }, [searchParams, searchParamKey])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (keyword.trim()) {
      params.set(searchParamKey, keyword.trim())
    } else {
      params.delete(searchParamKey)
    }

    // 페이지를 1로 리셋
    params.delete('page')

    router.push(`${basePath}?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setKeyword('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete(searchParamKey)
    params.delete('page')
    router.push(`${basePath}?${params.toString()}`)
  }

  const hasKeyword = keyword.trim().length > 0

  return (
    <div className="relative">
      <div
        className={`flex h-9 items-center rounded-md border px-2 ${
          hasKeyword ? 'border-gray05 bg-white' : 'border-[#CED7DE] bg-white'
        }`}
      >
        <IconSearch width={20} height={20} fill={hasKeyword ? '#757575' : '#CED7DE'} />
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`ml-2 flex-1 border-none bg-transparent text-14 outline-none ${
            hasKeyword ? 'text-gray06' : 'text-[#8B8B8C]'
          }`}
        />
        {hasKeyword && (
          <button
            onClick={handleClear}
            className="ml-2 flex items-center justify-center"
            aria-label="검색어 지우기"
          >
            <IconInputCancel width={20} height={20} fill="#757575" />
          </button>
        )}
      </div>
    </div>
  )
}
