# peer-tutoring API 명세서

바다 웹부 팀 프로젝트  

---

## 목차

- [초기 설정](#초기-설정)
- [인증 (Auth)](#인증-auth)
- [유저 (Users)](#유저-users)
- [질문 (Questions)](#질문-questions)
- [답변 (Answers)](#답변-answers)
- [태그 (Tags)](#태그-tags)
- [포인트 (Points)](#포인트-points)

---

## 초기 설정

```ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

## 인증 (Auth)

Supabase Auth로 처리합니다. 별도 API 없이 클라이언트에서 직접 호출합니다.

### 회원가입

```ts
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// 회원가입 후 users 테이블에 추가
await supabase.from('users').insert({
  id: data.user!.id,
  username: '바다',
  email: 'user@example.com',
})
```

> ✅ Supabase Database Trigger로 자동 insert되게 설정하면 더 안전합니다.

### 로그인

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
```

### 로그아웃

```ts
const { error } = await supabase.auth.signOut()
```

### 현재 유저 가져오기

```ts
const { data: { user } } = await supabase.auth.getUser()
```

---

## 유저 (Users)

### 프로필 조회

```ts
const { data, error } = await supabase
  .from('users')
  .select(`
    *,
    questionCount:questions(count),
    answerCount:answers(count)
  `)
  .eq('username', username)
  .single()
```

### 프로필 수정 (본인만)

RLS로 본인만 수정 가능합니다.

```ts
const { data, error } = await supabase
  .from('users')
  .update({ avatar_url: 'https://...' })
  .eq('id', user.id)
```

### 유저가 작성한 질문 목록

```ts
const { data, error } = await supabase
  .from('questions')
  .select(`
    id, title, is_solved, view_count, created_at,
    answers(count),
    question_tags(tags(name))
  `)
  .eq('author_id', userId)
  .order('created_at', { ascending: false })
  .range((page - 1) * limit, page * limit - 1)
```

### 유저가 작성한 답변 목록

```ts
const { data, error } = await supabase
  .from('answers')
  .select(`
    id, content, is_accepted, created_at,
    questions(id, title)
  `)
  .eq('author_id', userId)
  .order('created_at', { ascending: false })
  .range((page - 1) * limit, page * limit - 1)
```

---

## 질문 (Questions)

### 질문 목록 조회

```ts
// 기본 조회
const { data, error } = await supabase
  .from('questions')
  .select(`
    id, title, is_solved, view_count, created_at,
    author:users(username, avatar_url),
    answers(count),
    question_tags(tags(name))
  `)
  .order('created_at', { ascending: false })
  .range((page - 1) * limit, page * limit - 1)

// 태그 필터
  .eq('question_tags.tags.name', '수학')

// 해결 여부 필터
  .eq('is_solved', false)

// 제목 검색
  .ilike('title', `%${search}%`)

// 정렬
  .order('view_count', { ascending: false })  // 조회수순
  .order('answers.count', { ascending: false }) // 답변많은순
```

### 질문 작성

```ts
// 포인트 확인
const { data: userData } = await supabase
  .from('users')
  .select('points')
  .eq('id', user.id)
  .single()

if (userData.points < 5) throw new Error('포인트가 부족합니다.')

// 질문 insert
const { data, error } = await supabase
  .from('questions')
  .insert({
    title: '미적분 문제 질문입니다',
    content: '질문 내용...',
    author_id: user.id,
  })
  .select()
  .single()

// 태그 연결
const tagIds = await getOrCreateTags(['수학', '미적분'])
await supabase.from('question_tags').insert(
  tagIds.map(tagId => ({ question_id: data.id, tag_id: tagId }))
)

// 포인트 차감
await supabase.from('users')
  .update({ points: userData.points - 5 })
  .eq('id', user.id)

await supabase.from('point_histories').insert({
  user_id: user.id,
  amount: -5,
  reason: '질문 작성',
  ref_id: data.id,
})
```

### 질문 상세 조회 (조회수 +1)

```ts
// 조회수 증가
await supabase.rpc('increment_view_count', { question_id: id })

// 상세 조회
const { data, error } = await supabase
  .from('questions')
  .select(`
    *,
    author:users(username, avatar_url),
    question_tags(tags(name)),
    answers(
      id, content, is_accepted, created_at,
      author:users(username, avatar_url)
    )
  `)
  .eq('id', id)
  .single()
```

```sql
-- Supabase SQL Editor에서 함수 생성
CREATE OR REPLACE FUNCTION increment_view_count(question_id UUID)
RETURNS void AS $$
  UPDATE questions SET view_count = view_count + 1 WHERE id = question_id;
$$ LANGUAGE sql;
```

### 질문 수정 (작성자만)

RLS로 작성자만 수정 가능합니다.

```ts
const { data, error } = await supabase
  .from('questions')
  .update({
    title: '수정된 제목',
    content: '수정된 내용',
  })
  .eq('id', questionId)
  .eq('author_id', user.id)

// 태그 수정 — 기존 삭제 후 재insert
await supabase.from('question_tags').delete().eq('question_id', questionId)
const tagIds = await getOrCreateTags(['수학'])
await supabase.from('question_tags').insert(
  tagIds.map(tagId => ({ question_id: questionId, tag_id: tagId }))
)
```

### 질문 삭제 (작성자만)

RLS로 작성자만 삭제 가능합니다. CASCADE로 답변, 태그 연결도 자동 삭제됩니다.

```ts
const { error } = await supabase
  .from('questions')
  .delete()
  .eq('id', questionId)
  .eq('author_id', user.id)
```

---

## 답변 (Answers)

### 답변 작성

```ts
const { data, error } = await supabase
  .from('answers')
  .insert({
    content: '답변 내용...',
    author_id: user.id,
    question_id: questionId,
  })
  .select()
  .single()

// 포인트 지급
await supabase.from('users')
  .update({ points: currentPoints + 5 })
  .eq('id', user.id)

await supabase.from('point_histories').insert({
  user_id: user.id,
  amount: 5,
  reason: '답변 작성',
  ref_id: data.id,
})
```

### 답변 수정 (작성자만)

```ts
const { error } = await supabase
  .from('answers')
  .update({ content: '수정된 답변 내용...' })
  .eq('id', answerId)
  .eq('author_id', user.id)
```

### 답변 삭제 (작성자만)

```ts
const { error } = await supabase
  .from('answers')
  .delete()
  .eq('id', answerId)
  .eq('author_id', user.id)
```

### 답변 채택 (질문 작성자만)

트랜잭션이 필요해서 Supabase RPC로 처리합니다.

```ts
const { error } = await supabase.rpc('accept_answer', {
  answer_id: answerId,
})
```

```sql
-- Supabase SQL Editor에서 함수 생성
CREATE OR REPLACE FUNCTION accept_answer(answer_id UUID)
RETURNS void AS $$
DECLARE
  v_author_id UUID;
  v_question_id UUID;
  v_question_author_id UUID;
BEGIN
  -- 답변 작성자 및 질문 id 조회
  SELECT author_id, question_id INTO v_author_id, v_question_id
  FROM answers WHERE id = answer_id;

  -- 질문 작성자 확인 (본인 질문에만 채택 가능)
  SELECT author_id INTO v_question_author_id
  FROM questions WHERE id = v_question_id;

  IF v_question_author_id != auth.uid() THEN
    RAISE EXCEPTION '권한이 없습니다.';
  END IF;

  -- 답변 채택
  UPDATE answers SET is_accepted = true WHERE id = answer_id;

  -- 질문 해결 처리
  UPDATE questions SET is_solved = true WHERE id = v_question_id;

  -- 포인트 지급
  UPDATE users SET points = points + 15 WHERE id = v_author_id;

  -- 포인트 내역 기록
  INSERT INTO point_histories (user_id, amount, reason, ref_id)
  VALUES (v_author_id, 15, '답변 채택', answer_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 태그 (Tags)

### 태그 목록 조회

```ts
const { data, error } = await supabase
  .from('tags')
  .select('id, name')
  .ilike('name', `%${search}%`)
  .order('name')
```

### 태그 생성 또는 가져오기 (내부 유틸)

```ts
// lib/utils/tag.ts
export async function getOrCreateTags(tagNames: string[]): Promise<string[]> {
  const ids: string[] = []

  for (const name of tagNames) {
    const { data } = await supabase
      .from('tags')
      .upsert({ name }, { onConflict: 'name' })
      .select('id')
      .single()

    ids.push(data!.id)
  }

  return ids
}
```

---

## 포인트 (Points)

### 포인트 내역 조회 (본인만)

RLS로 본인 내역만 조회 가능합니다.

```ts
const { data, error } = await supabase
  .from('point_histories')
  .select('id, amount, reason, ref_id, created_at')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
  .range((page - 1) * limit, page * limit - 1)
```

---

## 포인트 정책

| 행동 | 포인트 |
|------|--------|
| 질문 작성 | -5 |
| 답변 작성 | +5 |
| 답변 채택됨 | +15 |

---

## RLS 정책 요약

| 테이블 | 읽기 | 쓰기 | 수정 | 삭제 |
|--------|------|------|------|------|
| users | 전체 | 본인 | 본인 | 본인 |
| questions | 전체 | 로그인 | 작성자 | 작성자 |
| answers | 전체 | 로그인 | 작성자 | 작성자 |
| tags | 전체 | 로그인 | X | X |
| question_tags | 전체 | 로그인 | X | 작성자 |
| point_histories | 본인 | 시스템 | X | X |