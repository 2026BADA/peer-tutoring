import { createBrowserClient } from "@supabase/ssr";

export function ceateClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_PuBLISHABLE_KEY!,
    );
}
