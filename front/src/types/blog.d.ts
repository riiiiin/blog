export type Blog = {
    id: number,
    title: string,
    body: string,
    tags: Tag[],
}

export type NewBlogPayload = {
    title: string,
    body: string,
    tags: number[],
}

export type Tag = {
    id: number,
    name: string
}

export type NewTagPayload = {
    name: string,
}

export type UpdateBlogPayload = {
    id: number,
    title?: string,
    body?: string,
    tags?: number[],
}