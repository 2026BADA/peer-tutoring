import Link from 'next/link';
import { getQuestions } from '@/lib/queries/questions';
import QuestionsList from '@/components/questions/QuestionsList';

// 서버 컴포넌트: 페이지가 렌더링되는 시점에 서버에서 직접 Supabase를 조회합니다.
// (브라우저가 아니라 서버에서 실행되므로 async 컴포넌트로 만들 수 있습니다)
export default async function Questions() {
    const questions = await getQuestions();

    return (
        <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
            <div className="mx-auto max-w-[720px]">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-medium text-base-content">질문 목록</h1>
                        <p className="mt-1 text-sm text-base-content/55">
                            궁금한 것을 검색하거나 새로 질문해보세요
                        </p>
                    </div>
                    <Link href="/questions/new" className="btn btn-primary btn-sm">
                        질문 작성
                    </Link>
                </div>

                <QuestionsList questions={questions} />

                <div className="mt-6 flex items-center justify-between rounded-xl border border-base-300 bg-base-200/30 p-5">
                    <p className="text-sm text-base-content/70">
                        찾는 질문이 없다면 새로 질문을 남겨보세요.
                    </p>
                    <Link href="/questions/new" className="btn btn-primary btn-sm">
                        질문 작성하기
                    </Link>
                </div>
            </div>
        </main>
    );
}
