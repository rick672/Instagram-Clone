export const verifyPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword
}