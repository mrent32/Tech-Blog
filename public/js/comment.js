document.getElementById('comment-form').addEventListener('submit', async function(event) {
    event.preventDefault()
    const comment_text = document.getElementById('comment').value
    const postId = this.getAttribute('data-post-id')
    if (comment_text && postId ) {
        const response = await fetch('/api/comments', {
            method: 'POST', 
            body: JSON.stringify({ comment_text, postId}), 
            headers: { 'Content-Type': 'application/json'},
        })
        if (response.ok) {
            document.location.replace('/post/' + postId)
        } else {
            alert(response.statusText)
        }
    }

})
