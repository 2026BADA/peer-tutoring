# peer-tutoring

peer-tutoring은 2026학년도 BADA 웹부의 팀 프로젝트로, 학생들이 공부하다가 막히는 부분을 사진 찍어 올리면, 동기나 선배님들이 답변을 직접 달아주는 학습 커뮤니티입니다. 비용이 들어가는 현금성 보상 대신 사용자들의 닉네임 앞에 계급을 달아서 자발적인 참여를 유도합니다.

## Installation

### OpenAI api 연동
1. [OpenAI Platform](https://platform.openai.com/docs/overview)에 로그인 후, api키를 발급해 복사합니다. (이때 토큰이 결제된 상태여야 합니다.)

2. git clone으로 프로젝트를 다운받습니다.

3. .env 파일의 `YOUR_API_KEY_HERE`부분에 api 키를 붙여넣기합니다.

4. lib/env/env.g.dart 파일의 `YOUR_API_KEY_HERE`부분에 api 키를 붙여넣기합니다.

### 파이썬 가상환경
1. server 폴더에 .venv 가상환경을 생성합니다.
2. 가상환경을 activate합니다.
2. requirements.txt에 적힌 패키지를 다운로드합니다.

## Usage

주요 기능
질문하기 : 문제지 사진 촬영 및 과목 태그 설정 후 업로드.
답변 : 실시간 질문 리스트에서 내가 풀 수 있는 문제에 댓글 및 이미지로 답변
채택 시스템 : 질문자가 가장 도움이 된 답변을 채택하면 답변자에게 점수 부여
프로필 커스터마이징 : 획득한 점수를 통하여 티어 업그레이드 및 배지 장식 가능.

커뮤니티 기능
수학(공통수학, 대수, 미적분, 기하, 확통), 과학(통과, 물리, 화학, 생명, 지구), 영어, 국어, 사회, 역사로 나누어야 함.
명예의 전당 : 주간 및 월간 답변 랭킹 TOP 3를 메인 화면에 박제.
신고 기능 : 부적절한 답변을 한 사용자에게 제한 부여.
보안 관련
학교 인증 : 학생증, 학교 이메일 또는 학교 구글 계정 등으로 인증.
AI 보조 기능
욕설 및 부적절한 말 자체 검열

## Todo
- [ ] asdf

## Contributing

Pull requests는 언제나 환영합니다. 중요한 변경을 위해서는 먼저 Issue를 생성하세요.

## License

[MIT](https://choosealicense.com/licenses/mit/)