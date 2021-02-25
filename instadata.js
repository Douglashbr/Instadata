const instadata = async ({name, quantity}, callback) => {

    const request = new Request(`https://instagram.com/${name}/?__a=1`);

    if (quantity > 0 && quantity <= 12){
        fetch(request, { mode: 'no-cors' })
        .then(response => {
            response.json()
            .then(response => {
                response = response
                            .graphql
                            .user
                            .edge_owner_to_timeline_media
                            .edges
                            .filter((res, i) => i < quantity ? res : "");
                
                const data = response.map(res => {
                    return {
                        likes: res.node.edge_media_preview_like.count,
                        comments: res.node.edge_media_to_comment.count,
                        imageUrl: res.node.thumbnail_resources[3].src
                    }
                })
                callback(data);
            })
            .catch(error => {
                console.error('InstaError: instagram user is not valid.');
            })
        })
        .catch(error => {
            console.error('InstaError: ', error)
        });
    }else if (quantity > 12){
        console.error('InstaError: max quantity is 12!');
    }else{
        console.error('InstaError: min quantity is 1!');
    }

}