// ============================================================
// CategoryFilter — 과목 필터 탭 컴포넌트
// ------------------------------------------------------------
// 질문 목록 상단의 [전체] [수학] [과학] [영어] [사회] 탭입니다.
// 선택된 탭은 아래에 밑줄이 생겨서 강조됩니다.
//
// 중요한 설계 원칙:
//   이 컴포넌트는 "지금 어떤 탭이 선택됐는지"를 스스로 기억하지 않습니다.
//   선택 상태(selected)는 부모(질문 목록 페이지)가 가지고 있고,
//   이 컴포넌트는 그 값을 props로 받아서 보여주기만 합니다.
//   탭을 클릭하면 onSelect를 호출해서 "이거 골랐어요"라고 부모에게 알리기만 합니다.
//
//   이렇게 하는 이유: 실제 질문 목록 필터링도 부모가 해야 하므로,
//   선택 상태를 부모가 들고 있는 게 자연스럽습니다.
//   (이 패턴을 "controlled component"라고 부릅니다.)
// ============================================================

import type { CategoryFilterValue } from '@/types';

// 화면에 표시할 탭 목록.
// '전체'를 맨 앞에 두고, 나머지는 과목들입니다.
const FILTER_TABS: CategoryFilterValue[] = ['전체', '수학', '과학', '영어', '사회'];

// 이 컴포넌트가 받는 props:
//   selected  → 현재 선택된 탭 (부모가 관리)
//   onSelect  → 탭이 클릭됐을 때 부모에게 알리는 함수
interface CategoryFilterProps {
    selected: CategoryFilterValue;
    onSelect: (category: CategoryFilterValue) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex gap-1">
            {/* FILTER_TABS 배열을 돌면서 탭 버튼을 하나씩 만듭니다. */}
            {FILTER_TABS.map((tab) => {
                // 이 탭이 현재 선택된 탭인지 확인
                const isActive = selected === tab;

                return (
                    <button
                        key={tab}
                        // 클릭하면 onSelect로 어떤 탭을 골랐는지 부모에게 전달
                        onClick={() => onSelect(tab)}
                        // 선택된 탭이면 글자를 진하게 + 아래 밑줄,
                        // 선택 안 된 탭이면 흐리게 + 투명한 밑줄(자리만 차지)
                        className={
                            'border-b-2 pb-2 text-[13px] transition-colors ' +
                            (isActive
                                ? 'border-base-content font-medium text-base-content'
                                : 'border-transparent text-base-content/50 hover:text-base-content/80')
                        }
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}
