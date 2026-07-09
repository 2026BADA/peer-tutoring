// ============================================================
// 더미(가짜) 데이터
// ------------------------------------------------------------
// 아직 Supabase(실제 데이터베이스) 연결 전이라, 화면을 먼저 만들기 위해
// 가짜 데이터를 여기에 하드코딩해 둡니다.
//
// 컴포넌트나 페이지에서 이 데이터를 import 해서 화면을 채우면 됩니다.
// 나중에 총괄이 이 부분을 실제 DB 호출 코드로 교체할 예정입니다.
//   예: DUMMY_QUESTIONS  →  await supabase.from('questions').select()
//
// 그래서 팀원은 "데이터가 어디서 오는지"는 신경 쓰지 말고,
// 이 배열을 진짜 데이터라고 생각하고 화면만 만들면 됩니다.
// ============================================================

import type { Question, Answer } from '@/types';

// ------------------------------------------------------------
// 질문 더미 데이터
// ------------------------------------------------------------
// Question[] 타입을 붙여뒀기 때문에, 필드를 빠뜨리거나 오타를 내면
// 바로 타입 에러가 떠서 실수를 막아줍니다.
export const DUMMY_QUESTIONS: Question[] = [
    {
        id: '1',
        authorId: 'user-1',
        authorName: '홍길동',
        category: '수학',
        title: '이차방정식 판별식이 음수일 때 해는 어떻게 되나요?',
        body: '해설을 봐도 잘 이해가 안됩니다. 판별식 D가 음수이면 실수해가 없다고 하는데, 그래프로는 어떻게 해석하나요?',
        status: 'open',
        answerCount: 2,
        createdAt: '2026-06-10T09:00:00Z',
    },
    {
        id: '2',
        authorId: 'user-2',
        authorName: '김철수',
        category: '과학',
        title: '미토콘드리아가 세포 호흡에서 하는 역할이 궁금합니다',
        body: 'ATP 생성 과정에서 미토콘드리아가 정확히 어떤 역할을 하는지 자세히 알고 싶어요.',
        status: 'closed',
        answerCount: 4,
        createdAt: '2026-06-09T14:30:00Z',
    },
    {
        id: '3',
        authorId: 'user-3',
        authorName: '이영희',
        category: '영어',
        title: '현재완료와 과거완료 시제 구분이 헷갈려요',
        body: '두 시제가 자꾸 헷갈리는데 명확하게 구분하는 방법이 있을까요?',
        status: 'open',
        answerCount: 0,
        createdAt: '2026-06-11T08:15:00Z',
    },
    {
        id: '4',
        authorId: 'user-4',
        authorName: '박민수',
        category: '수학',
        title: '삼각함수 그래프 주기 구하는 공식 정리해주실 분',
        body: '사인, 코사인 그래프에서 주기를 구하는 공식이 잘 기억나지 않습니다.',
        status: 'open',
        answerCount: 1,
        createdAt: '2026-06-11T07:40:00Z',
    },
    {
        id: '5',
        authorId: 'user-5',
        authorName: '정수진',
        category: '사회',
        title: '조선 후기 실학사상의 핵심 인물들이 헷갈립니다',
        body: '정약용, 박지원 등 실학자들의 사상 차이가 헷갈립니다.',
        status: 'closed',
        answerCount: 3,
        createdAt: '2026-06-08T16:20:00Z',
    },
];

// ------------------------------------------------------------
// 답변 더미 데이터
// ------------------------------------------------------------
// questionId 값으로 위의 질문과 연결됩니다.
// 예: questionId가 '1'인 답변들은 DUMMY_QUESTIONS의 첫 번째 질문(id: '1')에 달린 답변입니다.
// 질문 상세 페이지에서는 아래처럼 필터링해서 해당 질문의 답변만 골라냅니다.
//   DUMMY_ANSWERS.filter((answer) => answer.questionId === 현재질문ID)
export const DUMMY_ANSWERS: Answer[] = [
    {
        id: 'a1',
        questionId: '1',
        authorId: 'user-3',
        authorName: '이영희',
        body: '판별식이 음수면 실수해는 없지만, 복소수 범위에서는 두 개의 켤레복소수 해를 가집니다. 그래프로 보면 x축과 만나지 않는 포물선이에요.',
        isAdopted: false,
        createdAt: '2026-06-10T10:00:00Z',
    },
    {
        id: 'a2',
        questionId: '1',
        authorId: 'user-4',
        authorName: '박민수',
        body: '포물선이 x축 위에 떠 있거나 아래에 잠겨 있어서 교점이 없는 경우라고 생각하면 쉬워요.',
        isAdopted: false,
        createdAt: '2026-06-10T11:30:00Z',
    },
    {
        id: 'a3',
        questionId: '2',
        authorId: 'user-1',
        authorName: '홍길동',
        body: '미토콘드리아는 세포의 발전소라고 불립니다. 포도당을 분해해 얻은 에너지로 ATP를 대량 생산하는 곳이에요.',
        isAdopted: true, // 이 답변이 채택됨
        createdAt: '2026-06-09T15:00:00Z',
    },
];
