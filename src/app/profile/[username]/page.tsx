import { getProfileStats } from '@/lib/queries/profile';
import UserProfile from '@/components/profile/UserProfile';

// 폴더명은 [username]이지만, NavBar에서 실제로 연결하는 값은 유저의 UUID(profiles.id)입니다.
export default async function ProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const profile = await getProfileStats(username);

    if (!profile) {
        return (
            <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
                <p className="text-sm text-base-content/55">
                    사용자를 찾을 수 없습니다.
                </p>
            </main>
        );
    }

    return (
        <UserProfile
            nickname={profile.nickname}
            points={profile.points}
            questionCount={profile.questionCount}
            answerCount={profile.answerCount}
            adoptionRate={profile.adoptionRate}
        />
    );
}
