interface User {
    id: number,
    name: string,
    role: "admin" | "user" | "superAdmin", // this is union type
    posts: Array<Post>
}

interface Post {
    id: number,
    title: string
}

export const defaultUser: User = {
    id: 1,
    name: "Ahmad Raid",
    role: "admin",
    posts: [
        {
            id: 12,
            title: "Test 1"
        }, {
            id: 15,
            title: "Test 2"
        }, {
            id: 16,
            title: "Test 3"
        }
    ]
}