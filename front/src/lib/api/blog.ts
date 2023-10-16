import type { NewBlogPayload, Blog, UpdateBlogPayload } from "../../types/blog";

export const addBlogItem = async (payload: NewBlogPayload) => {
    const res = await fetch('http://localhost:3000/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw new Error('add blog request failed')
    }
    const json: Blog = await res.json();
    return json
}

export const getBlogItems = async() => {
    const res = await fetch('http://localhost:3000/blogs')
    if (!res.ok) {
        throw new Error('get blog request failed')
    }

    const json: Blog[] = await res.json()
    return json
}

export const getBlogItem =async (id: number) => {
    const res = await fetch(`http://localhost:3000/blogs/${id}`)
    if (!res.ok) {
        throw new Error('get Blog request failed')
    }
    const json: Blog = await res.json()
    return json
    
}

export const updateBlogItem = async (blog: UpdateBlogPayload) => {
    const { id, ...updateBlog } = blog
    const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBlog)
    })
    if (!res.ok) {
        throw new Error('update blog request failed')
    }

    const json: Blog = await res.json();
    return json
}

export const deleteBlogItem = async (id: number) => {
    const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        throw new Error('delete blog request failed')
    }
}