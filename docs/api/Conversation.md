# Conversations: LLM과 대화

## 새 대화 시작하기

> POST `/api/conversations`
> 유저의 입력을 받아 새로운 대화 시작

### 요청

- 인증 필요 (`Authorization: Bearer <token>`)
- Body (`Type: application/json`)

```json
{
  "input": "Could you give me some examples for ~ "
}
```

### 성공 응답

- Headers
  - `X-Conversation-Id`: (새로 생성된 대화의 ID)
  - `X-Conversation-Title`: (새로 생성된 대화의 제목)
  - `Content-Type: text/plain; charset=utf-8`

- Body
  - 응답 텍스트가 chunk 단위로 스트리밍됨 -> 스트리밍이 끝났을 때 DB에 최종 저장됨
  - 스트리밍 방식으로 `text/plain` 형식의 데이터가 전달됨

## 기존 대화 내역 기반으로 입력하기

> POST `/api/conversations/${id}`
> 이미 존재하는 채팅방에서 이어서 시작

### 요청

- 인증 필요 (`Authorization: Bearer <token>`)
- Query Parameters: `id(conversationId)`
- Body (Type: application/json)

```json
{
  "input": "Could you give me some examples for ~ "
}
```

### 성공 응답

- Headers
  - `Content-Type: text/plain; charset=utf-8`

- Body
  - 응답 텍스트가 chunk 단위로 스트리밍됨 -> 스트리밍이 끝났을 때 DB에 최종 저장됨
  - 스트리밍 방식으로 `text/plain` 형식의 데이터가 전달됨

## 기존 대화 내역 불러오기

> GET `/api/conversations/${id}/messages`
> 현재 사용자의 모든 대화 제목 목록을 조회

### 요청

- 인증 필요 (`Authorization: Bearer <token>`)
- Query Parameters: `id(conversationId)`

### 성공 응답

- Headers
  - `Content-Type: Content-Type: application/json`

- Body

```json
[
  {
    id: '555f8898-646a-42ed-95a4-f9d85ca9e2ad',
    conversation_id: 'a2215bdd-ac32-4ab4-917e-e2411cba7139',
    role: 'user',
    content: "Is 'call A a B common way to say 'finishing something'? If so, please give me some sentences for getting it well.",
    created_at: '2025-11-08T07:18:35.449598'
  },
  {
    id: 'c307726e-4188-4ccd-bf43-fadb8611c7ed',
    conversation_id: 'a2215bdd-ac32-4ab4-917e-e2411cba7139',
    role: 'assistant',
    content: "That's a great question!\n" +
      '\n' +
      "To answer your first point: no, **'call A a B' is generally not a common way to say 'finishing something.'**\n
" +
      '\n' +
      "Let's break down what 'call A a B' usually means and then I'll give you some common ways to express 'finishing
 something.'\n" +
      '\n' +
      '**Correction and Recommendation:**\n' +
      '\n' +
      `Your sentence, "Is 'call A a B common way to say 'finishing something'?" is perfectly clear and grammatically
correct. There are no errors to point out, and it's a great example of asking a direct question to clarify vocabulary
! Well done!`,
    created_at: '2025-11-08T07:18:42.647277'
  },
  {
    id: '26c56c7c-2c1a-480b-b7c1-ecef7efa50bc',
    conversation_id: 'a2215bdd-ac32-4ab4-917e-e2411cba7139',
    role: 'user',
    content: 'I mean this verbs - call it a day(ending of a day), call it a career(retirement).',
    created_at: '2025-11-08T07:22:03.695014'
  },
  ]
```

## 모든 대화(제목) 목록 불러오기

> GET `/api/conversations`
> 현재 인증된 사용자의 모든 대화 제목을 조회

### 요청

- 인증 필요 (`Authorization: Bearer <token>`)

### 성공 응답

- Headers
  - `Content-Type: Content-Type: application/json`

- Body

```json
[
  {
    "id": "a2215bdd-ac32-4ab4-917e-e2411cba7139",
    "title": "2025-11-08 16:18",
    "created_at": "2025-11-08T07:18:34.775435"
  },
  {
    "id": "dd212420-59d0-4ac1-89f0-07f3488d4d6c",
    "title": "2025-11-07 15:22",
    "created_at": "2025-11-07T06:22:24.047434"
  }
]
```
