'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

// 답변 작성. insert가 성공하면 answers 테이블의 트리거가 자동으로 포인트 +5를 처리합니다.
export async function submitAnswer({
    questionId,
    body,
}: {
    questionId: string;
    body: string;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인이 필요합니다');
    }

    const { error } = await supabase.from('answers').insert({
        question_id: questionId,
        author_id: user.id,
        body,
    });

    if (error) throw error;

    // 이 페이지는 클릭이 아니라 직접 함수 호출로 Server Action을 실행했기 때문에,
    // Next.js가 자동으로 화면을 새로고침해주지 않습니다.
    // revalidatePath로 "이 경로의 캐시된 데이터는 낡았다"고 표시해두면,
    // 클라이언트에서 router.refresh()를 호출했을 때 새 데이터를 다시 가져옵니다.
    revalidatePath(`/questions/${questionId}`);
}

// 답변 채택. DB에 미리 만들어둔 adopt_answer 함수(RPC)를 호출합니다.
// 실제 권한 검사("질문 작성자만 채택 가능")와 포인트 +30 지급은
// 그 함수 안(SQL, security definer)에서 처리되므로 여기서는 그냥 호출만 합니다.
export async function adoptAnswer({
    answerId,
    questionId,
}: {
    answerId: string;
    questionId: string;
}) {
    const supabase = await createClient();

    const { error } = await supabase.rpc('adopt_answer', {
        p_answer_id: answerId,
    });

    if (error) throw error;

    revalidatePath(`/questions/${questionId}`);
}
