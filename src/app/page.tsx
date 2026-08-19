import Link from 'next/link';

const STEPS = [
    {
        n: '1',
        title: '질문하기',
        body: '막히는 문제를 사진으로 찍고 과목을 태그해서 올려요.',
    },
    {
        n: '2',
        title: '답변받기',
        body: '실시간 질문 목록에서 동기와 선배들이 답변을 남겨요.',
    },
    {
        n: '3',
        title: '채택하기',
        body: '가장 도움이 된 답변을 채택하면 답변자에게 점수가 쌓여요.',
    },
    {
        n: '4',
        title: '티어 올리기',
        body: '쌓인 점수로 계급을 올리고 뱃지로 프로필을 꾸며요.',
    },
];

export default function Home() {
    return (
        <div>
            <main className="mx-auto max-w-[1200px] px-6 py-16">
                {/* 히어로: 사이트 소개 */}
                <div className="max-w-[640px]">
                    <h1 className="text-3xl font-semibold leading-snug text-base-content">
                        공부하다 막히면,
                        <br />
                        여기서 물어보세요
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-base-content/60">
                        문제를 사진으로 찍어 올리면 동기와 선배들이 답변을 달아줍니다.
                        현금성 보상 대신, 계급과 뱃지로 자발적인 참여를 응원합니다.
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                        <Link href="/questions" className="btn btn-primary btn-sm">
                            질문 둘러보기
                        </Link>
                        <Link href="/questions/new" className="btn btn-outline btn-sm">
                            질문하기
                        </Link>
                        <button className="btn btn-outline btn-sm">로그인</button>
                    </div>
                </div>

                {/* 이용 방법 */}
                <div className="mt-16 border-t border-base-300 pt-10">
                    <h2 className="text-lg font-medium text-base-content">이용 방법</h2>
                    <p className="mt-1 text-sm text-base-content/55">
                        네 단계로 질문하고 답변받아요
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map((step) => (
                            <div
                                key={step.n}
                                className="rounded-xl border border-base-300 p-4"
                            >
                                <span className="text-xs font-medium text-base-content/40">
                                    {step.n}
                                </span>
                                <h3 className="mt-2 text-sm font-medium text-base-content">
                                    {step.title}
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-base-content/55">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 마무리 CTA */}
                <div className="mt-10 flex items-center justify-between rounded-xl border border-base-300 bg-base-200/30 p-5">
                    <p className="text-sm text-base-content/70">
                        궁금한 게 있으면 지금 바로 질문을 남겨보세요.
                    </p>
                    <Link href="/questions/new" className="btn btn-primary btn-sm">
                        질문 작성하기
                    </Link>
                </div>
            </main>
        </div>
    );
}
