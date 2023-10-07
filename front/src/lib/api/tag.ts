import type { Tag, NewTagPayload } from '../../types/blog';

export const getTagItems = async () => {
    const res = await fetch('http://localhost:3000/tags')
    if (!res.ok) {
        throw new Error('get tag request failed')
    }
    const json: Tag[] = await res.json();
    return json
}

export const addTagItem = async (payload: NewTagPayload) => {
    const res = await fetch('http://localhost:3000/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (!res.ok) {
        throw new Error('add tag request failed')
    }
    const json: Tag = await res.json();
    return json
}

export const deleteTagItem =async (id: number) => {
    const res = await fetch(`http://localhost:3000/tags/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) {
        throw new Error('delete tag request failed')
    }
}