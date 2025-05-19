# GoQual Frontend Project

## 설치 및 실행

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm start
```

## 주요 디렉토리 구조

```
src/
├── apis/          # API 통신 관련 코드
├── hooks/         # 커스텀 React Hooks
│   └── api/       # API 통신 관련 hooks
├── layout/        # 레이아웃 관련 컴포넌트
├── lib/           # 유틸리티 함수
│   ├── axios.js           # Axios 인스턴스 설정
│   ├── constant.js        # 상수 정의
│   ├── queryKeyFactory.js # React Query 키 팩토리
│   └── utils.js           # 공통 유틸리티 함수
└── views/         # 페이지 컴포넌트
```

## 주요 기능

- 기기 상태 모니터링 대시보드
  - 실시간 기기 상태 차트 표시
  - 기기 상태 데이터 시각화
- 전구 제어 대시보드
  - 밝기 제어 기능
  - 실시간 제어 상태 표시

## 추가 설치한 기술 스택

- React Query
- Chart.js
- Axios

## 라이브러리 선택 이유

### React Query

- 서버 상태 관리 최적화
- 캐싱 기능
- 실시간 데이터 동기화

### React Hook Form

- 폼 상태 관리의 성능 최적화
- 불필요한 리렌더링 방지
- 유효성 검사 및 에러 핸들링이 간편

### Axios

- 인터셉터를 통한 요청/응답 처리 용이
- 요청 취소 기능 지원
- 자동 JSON 변환

## 개선하고 싶은 점

1. 토큰 갱신 기능 구현

   - Refresh Token을 활용한 자동 토큰 갱신 도입
   - 토큰 만료 시 자동 갱신 로직 구현

2. TypeScript 도입
   - CoreUI React Admin Template의 JavaScript 기반 구조로 인해 현재는 적용하지 않음
   - 향후 프로젝트 마이그레이션 한다면 TypeScript 적용 계획
