import { users } from "./LoginCred";
import { Questions } from "./Questions";


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchQuestions = async (selected) => {
    await timeout(1000);
    return Questions.filter((question) => {
        const intersection = question.category.filter((cat) => selected.includes(cat))
        return intersection.length > 0
    })
}

export const fetchUser = async () => {
    await timeout(1000);
    return users
}

export const login = async (email, password) => {
    await timeout(1000);
    if (email === users[0].username && password === users[0].password) {
        return {
            success: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwicm9sZSI6ImFkbWluIn0.iSGd1uzsMMWYXhgO69ekQpSIOZJoJ3zwBovaeSxNtbg"
        }
    } else {
        return {
            success: false,
        }
    }
}