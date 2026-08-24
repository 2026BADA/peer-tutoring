// ============================================================
// 프로필 통계 조회
// ------------------------------------------------------------
// profiles(닉네임/포인트)와 questions/answers 테이블의 개수를 세어서
// "질문 수 / 답변 수 / 채택률"을 계산합니다.
// ============================================================

import { createClient } from '@/lib/supabase/server';

export interface ProfileStats {
    id: string;
    nickname: string;
    points: number;
    questionCount: number;
    answerCount: number;
    adoptionRate: number; // 0~100 사이 정수
}

// id로 존재하지 않는 유저면 null을 돌려줍니다.
export async function getProfileStats(
    userId: string,
): Promise<ProfileStats | null> {
    const supabase = await createClient();

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, nickname, points')
        .eq('id', userId)
        .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) return null;

    // count: 'exact', head: true → 실제 행 데이터는 안 가져오고 "개수"만 셉니다.
    // (행 전체를 다 가져와서 .length로 세는 것보다 훨씬 가볍습니다)
    const { count: questionCount, error: questionError } = await supabase
        .from('questions')
        .select('id', { count: 'exact', head: true })
        .eq('author_id', userId);

    if (questionError) throw questionError;

    const { count: answerCount, error: answerError } = await supabase
        .from('answers')
        .select('id', { count: 'exact', head: true })
        .eq('author_id', userId);

    if (answerError) throw answerError;

    const { count: adoptedCount, error: adoptedError } = await supabase
        .from('answers')
        .select('id', { count: 'exact', head: true })
        .eq('author_id', userId)
        .eq('is_adopted', true);

    if (adoptedError) throw adoptedError;

    const totalAnswers = answerCount ?? 0;
    const adoptionRate =
        totalAnswers > 0
            ? Math.round(((adoptedCount ?? 0) / totalAnswers) * 100)
            : 0;

    return {
        id: profile.id,
        nickname: profile.nickname,
        points: profile.points,
        questionCount: questionCount ?? 0,
        answerCount: totalAnswers,
        adoptionRate,
    };
}
