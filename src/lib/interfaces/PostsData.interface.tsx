export interface PostsData {
    likes: number,
    likesArray: string[],
    comments: {
        content: string,
        likes: number,
        userRef: string,
    }[]
    // Postid -> uid_userData.posts.length
    postId: string,
    postDate: string,
    userRef: string,
    content: string,
    hasImage: boolean,
    imageURL?: string,
}