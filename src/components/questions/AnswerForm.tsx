// ============================================================
// AnswerForm — 답변 작성 폼 컴포넌트
// ------------------------------------------------------------
// 질문 상세 페이지 맨 아래에 들어가는 "답변을 입력하세요" 폼입니다.
//
// 이 컴포넌트는 "controlled component"입니다. 즉, 입력창의 값을 스스로 들고 있지 않고,
// 부모가 value로 내려준 값을 그대로 화면에 보여주고,
// 사용자가 글자를 칠 때마다 onChange로 부모에게 알립니다.
//
//   value     → 현재 입력창에 들어있는 글자 (부모가 관리)
//   onChange  → 글자가 바뀔 때 부모에게 새 값을 전달하는 함수
//   onSubmit  → "등록" 버튼을 눌렀을 때 실행할 함수 (실제 저장 로직은 총괄이 작성)
//
// 이렇게 값을 부모가 관리하면, 답변 제출이 끝난 뒤 입력창을 비우는 것도
// 부모가 value를 ''로 바꾸는 것만으로 처리할 수 있습니다.
// ============================================================

interface AnswerFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function AnswerForm({ value, onChange, onSubmit }: AnswerFormProps) {
    // 입력값이 공백뿐이면(또는 비어있으면) 등록 버튼을 비활성화하기 위한 값.
    // trim()은 양쪽 공백을 제거하므로, 띄어쓰기만 잔뜩 친 경우도 빈 값으로 처리됩니다.
    const isEmpty = value.trim().length === 0;

    return (
        <div className="rounded-xl border border-base-300 bg-base-100 p-4">
            <p className="mb-2 text-sm font-medium text-base-content">답변 작성</p>

            {/* 답변 본문 입력창 (textarea).
                value와 onChange가 연결되어 있어, 항상 부모의 값과 동기화됩니다.
                e.target.value 는 사용자가 입력창에 친 현재 글자 전체입니다. */}
            <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="답변을 입력하세요"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {/* 답변하기 버튼.
                입력값이 비어있으면(isEmpty) 버튼을 비활성화(disabled)해서
                빈 답변이 제출되는 것을 막습니다. */}
            <div className="mt-2 flex justify-end">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={onSubmit}
                    disabled={isEmpty}
                >
                    답변하기
                </button>
            </div>
        </div>
    );
}
