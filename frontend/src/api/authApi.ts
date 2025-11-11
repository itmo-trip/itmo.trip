export async function login(username: string, password: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 500));
    return username === "admin" && password === "1234";
}
