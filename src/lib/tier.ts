// ============================================================
// 티어(등급) 계산
// ------------------------------------------------------------
// profiles.tier 컬럼이 DB에서 award_points 함수 실행 시 자동으로 갱신되지만,
// 화면에 보여줄 "이름"과 "이모지"는 프론트에서 포인트만 있으면 바로 계산할 수 있게
// 여기서도 동일한 기준을 정의해둡니다. (기획서 3.3 티어 표 기준)
// ============================================================

export interface TierInfo {
    level: number; // 1(다이아몬드, 최고) ~ 5(브론즈, 최저). DB profiles.tier와 동일한 값
    name: string;
    emoji: string;
    minPoints: number;
}

export const TIERS: TierInfo[] = [
    { level: 1, name: '다이아몬드', emoji: '👑', minPoints: 10000 },
    { level: 2, name: '플래티넘', emoji: '💎', minPoints: 4000 },
    { level: 3, name: '골드', emoji: '🥇', minPoints: 1500 },
    { level: 4, name: '실버', emoji: '🥈', minPoints: 500 },
    { level: 5, name: '브론즈', emoji: '🥉', minPoints: 0 },
];

// 포인트를 넣으면 해당하는 티어 정보를 돌려줍니다.
// TIERS는 minPoints가 높은 순서로 정렬돼 있어서, 맨 처음 만족하는 항목이 정답입니다.
export function getTierInfo(points: number): TierInfo {
    return TIERS.find((tier) => points >= tier.minPoints) ?? TIERS[TIERS.length - 1];
}

export function getTierLabel(points: number): string {
    const tier = getTierInfo(points);
    return `${tier.emoji} ${tier.name}`;
}
