document.getElementById('new-post').addEventListener('submit', async function(event) {
    event.preventDefault()
    const post_text = document.getElementById('post').value
    const post_title = document.getElementById('title').value
    console.log(post_text && post_title)
    if (post_text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ post_text, post_title}),
            headers: { 'Content-Type': 'application/json'},
        }) 
        if (response.ok) {
            document.location.replace('/' )
        } else {
            alert(response.statusText)
        }
    }
}) 