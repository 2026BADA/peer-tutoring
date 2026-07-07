import { login } from "./actions";

export default function Login() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <form action={login}>
                <button className="btn btn-neutral">Google로 로그인</button>
            </form>
        </div>
    );
}
