export function spotifyLogout() {
    ["access_token", "refresh_token", "token_expiry", "user_id", "code_verifier"].forEach((key) =>
        localStorage.removeItem(key),
    );
}
