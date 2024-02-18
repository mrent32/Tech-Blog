document.getElementById('delete').addEventListener('click', async function(){
    const postId = this.getAttribute('data-post-id')
    console.log(postId)
    if(postId) {
        try {
            const response = await fetch('/api/posts/'+ postId, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              });
              if(response.ok) {
                document.location.replace('/post/' + postId)
              }
        } catch (err) {
            console.log('error')
        }
    }
})
