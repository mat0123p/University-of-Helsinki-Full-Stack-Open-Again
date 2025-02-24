const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max,blog) => {
        return max.likes > blog.likes ? max : blog;
    },blogs[0])
}

const mostBlogs = (blogs) => {
    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
        return counts;
    }, {});

    const authorWithMostBlogs = Object.entries(authorCounts).reduce((max, [author, count]) => {
        return count > max[1] ? [author, count] : max;
    }, ['', 0]);

    return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((likes,blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
        return likes;
    },{});

    const authorWithMostLikes = Object.entries(authorLikes).reduce((max, [author, likes]) => {
        return likes > max[1] ? [author, likes] : max;
    }, ['', 0]);

    return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] };
}


module.exports = {
    totalLikes,
    favoriteBlog,
    dummy,
    mostBlogs,
    mostLikes
}
