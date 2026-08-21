// ============================================================
// 질문 목록/상세 조회 함수
// ------------------------------------------------------------
// Supabase에서 questions를 가져올 때, author_id/category_id는 각각
// profiles/categories 테이블의 id일 뿐 사람이 읽을 수 있는 값(닉네임, 과목명)이
// 아닙니다. 그래서 questions만 조회하면 "누가 썼는지", "무슨 과목인지"를
// 알 수 없고, 관련된 테이블까지 같이 가져와야(join) 합니다.
//
// Supabase는 `.select("컬럼, 참조테이블(가져올 컬럼)")` 형태로 쓰면
// 외래키(foreign key) 관계를 보고 알아서 join해서 중첩된 객체로 돌려줍니다.
// (SQL을 직접 안 써도, JS 객체 모양을 적는 것만으로 join이 됩니다)
//
// ⚠️ 이 프로젝트는 Supabase CLI를 안 쓰기로 해서 `supabase gen types`로
// DB 스키마를 TypeScript 타입으로 자동 생성하지 않았습니다. 그래서 쿼리 결과가
// 느슨한 타입(any에 가까움)으로 나오고, 아래에서 수동으로 우리 Question 타입에
// 맞게 매핑해줍니다.
// ============================================================

import { createClient } from '@/lib/supabase/server';
import type { Question, Answer } from '@/types';

// Supabase에서 돌아온 한 행(row)을 우리 Question 타입으로 변환합니다.
// DB의 id는 숫자(bigint)지만 우리 타입은 문자열이라 String()으로 바꿔줍니다.
function toQuestion(row: any): Question {
    return {
        id: String(row.id),
        authorId: row.author_id,
        authorName: row.profiles?.nickname ?? '알 수 없음',
        subject: row.categories?.subject,
        category: row.categories?.name,
        title: row.title,
        body: row.body,
        status: row.status,
        answerCount: row.answers?.length ?? 0,
        createdAt: row.created_at,
    };
}

// 질문 목록 전체를 최신순으로 가져옵니다. (/questions 페이지에서 사용)
export async function getQuestions(): Promise<Question[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('questions')
        .select(
            `
            id,
            author_id,
            title,
            body,
            status,
            created_at,
            profiles ( nickname ),
            categories ( subject, name ),
            answers ( id )
            `,
        )
        .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map(toQuestion);
}

// 질문 하나를 id로 가져옵니다. (/questions/[id] 페이지에서 사용)
// 없는 id면 null을 돌려줍니다.
export async function getQuestionById(id: string): Promise<Question | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('questions')
        .select(
            `
            id,
            author_id,
            title,
            body,
            status,
            created_at,
            profiles ( nickname ),
            categories ( subject, name ),
            answers ( id )
            `,
        )
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return toQuestion(data);
}

// 특정 질문에 달린 답변 목록을 가져옵니다. 채택된 답변이 위로 오게 정렬합니다.
export async function getAnswersByQuestionId(
    questionId: string,
): Promise<Answer[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('answers')
        .select(
            `
            id,
            question_id,
            author_id,
            body,
            is_adopted,
            created_at,
            profiles ( nickname )
            `,
        )
        .eq('question_id', questionId)
        .order('is_adopted', { ascending: false })
        .order('created_at', { ascending: true });

    if (error) throw error;

    return (data ?? []).map((row: any) => ({
        id: String(row.id),
        questionId: String(row.question_id),
        authorId: row.author_id,
        authorName: row.profiles?.nickname ?? '알 수 없음',
        body: row.body,
        isAdopted: row.is_adopted,
        createdAt: row.created_at,
    }));
}
