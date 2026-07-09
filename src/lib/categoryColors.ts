// ============================================================
// 카테고리(과목)별 색상 매핑
// ------------------------------------------------------------
// 과목마다 고유 파스텔 색상을 정해두고, 여러 컴포넌트에서 공통으로 씁니다.
// 색상을 한 곳에서만 관리하면, 나중에 "수학 색이 너무 진하다" 싶을 때
// 이 파일 한 곳만 고치면 카드/뱃지 전체가 같이 바뀝니다.
//
// 각 과목마다 3가지 색을 정의합니다:
//   - card:   카드 배경색 (아주 옅은 파스텔, 거의 흰색에 가까움)
//   - badge:  카테고리 뱃지 배경색 (카드보다 진한 파스텔)
//   - text:   뱃지 위에 올라가는 글자색 (파스텔 위에서도 잘 보이는 진한 색)
// ============================================================

import type { Category } from '@/types';

// 색상 묶음의 모양을 정의합니다.
interface CategoryColor {
    card: string; // 카드 배경
    badge: string; // 뱃지 배경
    text: string; // 뱃지 글자색
}

// 과목 → 색상 묶음 매핑표
// Record<Category, CategoryColor> 는 "Category의 모든 값에 대해
// CategoryColor를 빠짐없이 정의해야 한다"는 뜻입니다.
// (과목 하나라도 빠뜨리면 타입 에러가 납니다.)
export const CATEGORY_COLORS: Record<Category, CategoryColor> = {
    수학: { card: '#FFF6F7', badge: '#FDE2E4', text: '#8B4049' },
    과학: { card: '#F4F9EF', badge: '#E2F0CB', text: '#4A5E2A' },
    영어: { card: '#F0F8FB', badge: '#CDE7F0', text: '#2A5A6B' },
    사회: { card: '#F8F5FF', badge: '#E5DEFF', text: '#4A3E7A' },
    기타: { card: '#F7F6F2', badge: '#E8E6E1', text: '#5A5A55' },
};

// 과목 이름을 넣으면 색상 묶음을 돌려주는 함수.
// 컴포넌트에서 CATEGORY_COLORS[category] 로 직접 접근해도 되지만,
// 함수로 감싸두면 나중에 색상 로직이 복잡해져도 컴포넌트 코드는 그대로 둘 수 있습니다.
export function getCategoryColor(category: Category): CategoryColor {
    return CATEGORY_COLORS[category];
}
