'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { CategoryName } from '@/types';

interface CreateQuestionInput {
    title: string;
    category: CategoryName;
    body: string;
    images: string[];
}

// 질문 작성 폼 제출 시 실행되는 Server Action.
// 1) 로그인 여부 확인 2) 과목 이름 → categories.id 조회
// 3) questions에 insert (author_id는 반드시 서버에서 조회한 값만 사용 —
//    클라이언트가 보낸 값을 그대로 믿으면 남의 id로 질문을 대신 쓰는 게 가능해짐)
// insert가 성공하면 questions 테이블의 트리거가 자동으로 포인트 -10을 처리합니다.
export async function createQuestion({
    title,
    category,
    body,
    images,
}: CreateQuestionInput) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인이 필요합니다');
    }

    const { data: categoryRow, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();

    if (categoryError || !categoryRow) {
        throw new Error('존재하지 않는 과목입니다');
    }

    const { data: question, error } = await supabase
        .from('questions')
        .insert({
            author_id: user.id,
            category_id: categoryRow.id,
            title,
            body,
            images,
        })
        .select('id')
        .single();

    if (error) throw error;

    redirect(`/questions/${question.id}`);
}
