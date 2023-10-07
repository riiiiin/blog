import { Tag } from "../types/blog";

export const toggleTags = (tags: Tag[], target: Tag) => 
    tags.find(({ id }) => id === target.id)
        ? tags.filter(({ id }) => id !== target.id)
        : [...tags, target]