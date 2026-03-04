# 모달 사용 가이드

이 문서는 현재 프로젝트(`BTS-Frontend`)에서 제공하는 모달 종류와 사용 방법을 정리한 문서입니다.

## 1. 전체 구조

- 전역 모달 렌더러: `src/components/modal/GlobalModal.tsx`
- 전역 상태 스토어: `src/store/modalStore.ts`
- 루트 마운트 위치: `src/app/layout.tsx` (`<GlobalModal />`)

즉, 페이지/컴포넌트 어디서든 `useModalStore`로 열면 루트에서 렌더링됩니다.

## 2. 기본 사용 API

```tsx
const { openModal, closeModal } = useModalStore()

openModal(<MyModalContent />, {
  // 옵션 props
})

closeModal()
```

`openModal(view, props)`의 `props`는 `GlobalModal`에서 각 모달 컴포넌트로 전달됩니다.

## 3. 모달 종류

### 3-1. 기본 중앙 모달 (`Modal`)

- 컴포넌트: `src/components/modal/Modal.tsx`
- 기본 variant (별도 `variant` 미지정 시 사용)
- 화면 중앙 정렬

주요 props:
- `title?: string`
- `hideCloseButton?: boolean` (기본 `false`)
- `closeOnOverlayClick?: boolean` (기본 `true`)
- `className?: string`

예시:
```tsx
openModal(<ConfirmModalContent ... />, {
  title: '로그아웃',
})
```

실사용:
- `src/app/(user)/my/page.tsx`
- `src/components/nav/BottomNav.tsx`

### 3-2. 바텀시트 모달 (`BottomSheetModal`)

- 컴포넌트: `src/components/modal/BottomSheetModal.tsx`
- `props.variant = 'bottomSheet'`
- 화면 하단에서 올라오는 형태

주요 props:
- `title?: string`
- `hideCloseButton?: boolean` (기본 `false`)
- `closeOnOverlayClick?: boolean` (기본 `false`)
- `className?: string`

예시:
```tsx
useModalStore.setState({
  isOpen: true,
  props: {
    variant: 'bottomSheet',
    hideCloseButton: true,
    closeOnOverlayClick: true,
    className: 'mx-[8px] mb-[12px]',
  },
  view: <SortPopup currentSort={currentSort} />,
})
```

실사용:
- `src/app/(theme)/theme/components/list/ThemeSortDropdown.tsx`
- `src/app/(community)/board/recruit/components/list/RecruitSortDropdown.tsx`
- `src/app/(theme)/theme/components/detail/ReviewItem.tsx`
- `src/app/(community)/board/recruit/[id]/components/RecruitBoardComments.tsx`
- `src/app/(community)/board/recruit/[id]/components/RecruitBoardPost.tsx`

### 3-3. 풀스크린 모달 (`FullScreenModal`)

- 컴포넌트: `src/components/modal/FullScreenModal.tsx`
- `props.variant = 'fullScreen'`
- 모바일 화면 전환형 UI에 적합

주요 props:
- `title?: string`
- `hideCloseButton?: boolean` (기본 `false`)
- `className?: string`

예시:
```tsx
openModal(<ThemeSelectModal onSelect={...} />, {
  variant: 'fullScreen',
  title: '테마 연결하기',
})
```

실사용:
- `src/app/(community)/board/recruit/write/components/RecruitForm.tsx`

## 4. 공용 모달 콘텐츠 컴포넌트

### 4-1. 확인/취소 모달 콘텐츠

- 컴포넌트: `src/components/modal/ConfirmModalContent.tsx`
- 역할: 확인/취소 2버튼 공통 UI
- props:
  - `title`
  - `message`
  - `onConfirm`
  - `confirmText?`
  - `cancelText?`

특징:
- 확인 시 `onConfirm()` 실행 후 `closeModal()`
- 취소 시 바로 `closeModal()`

### 4-2. 신고 모달 콘텐츠

- 리뷰 신고: `src/components/report/ReportModalContent.tsx`
- 게시글 신고: `src/components/report/BoardReportModalContent.tsx`
- 댓글 신고: `src/components/report/CommentReportModalContent.tsx`

공통적으로 라디오 옵션 + 직접 입력(`기타`) + 제출 후 `closeModal()` 패턴을 사용합니다.

## 5. 구현 패턴 권장사항

- 가능한 기본 패턴은 `openModal(view, props)` / `closeModal()` 사용
- 현재 코드에는 `useModalStore.setState(...)` 직접 호출 패턴도 존재
- 신규 구현에서는 일관성을 위해 `openModal`/`closeModal` 우선 사용 권장
- 메뉴/정렬/액션시트 성격: `bottomSheet`
- 입력 플로우/검색/선택 화면: `fullScreen`
- 단순 확인/알림/경고: 기본 중앙 모달

## 6. 문의하기 구현 전 체크리스트

- 문의하기 UX가 어떤 성격인지 먼저 결정
  - 단순 링크 안내/확인: 기본 모달
  - 옵션 선택 액션시트: 바텀시트
  - 입력 폼(문의 내용 작성): 풀스크린 모달
- 닫힘 정책 결정
  - 바깥 클릭으로 닫기 허용 여부 (`closeOnOverlayClick`)
  - 우상단/상단 닫기 버튼 노출 여부 (`hideCloseButton`)
- 완료 후 동작
  - 모달 닫기
  - 토스트 노출 필요 시 `useToast` 함께 사용
