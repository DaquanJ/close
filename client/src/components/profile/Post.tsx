import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShortTextIcon from '@mui/icons-material/ShortText';
import { ConfirmDialog } from '../../common/components/dialog/Dialog.tsx';
import { PostCard } from '../../common/components/cards/PostCard.tsx';
import { find, profilePicUrl, retreiveProfile } from '../../common/api/user/Users.Api.ts';
import { retreivePost, newComment, deletePost } from '../../common/api/user/Post.Api.ts';
import { Grid } from '@mui/material';

interface IPost {

}


export const Post: React.FC<IPost> = ({ currentUser, profiles }) => {

    const [open, setOpen] = useState(true);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [newComments, setNewComments] = useState({
        comment: '',
        user_id: currentUser?.id,
        username: currentUser?.username,
        likes: 0
    });
    const [text, setText] = useState({
        comment: '',
        likes: 0
    });

    const handleChange = (e) => {
        setNewComments({
            ...newComments,
            comment: e.target.value
        })
    }

    const postId = useParams().post;

    // returning selected post
    const returnPost = async () => {
        const res = await retreivePost(postId)
        setPost(res.data)
    }

    const removePost = async () => {
        deletePost(postId)
            .then(async () => {
                const newUser = await retreiveProfile(post?.user_id);
                profiles(newUser.data);
            }).catch((err) => console.error('POST ERR: ', err))

        setOpen(false);
        window.history.back();
    }

    // returning user associated with post
    const returnUser = async () => {
        const res = await retreiveProfile(post?.user_id)
        setUser(res.data)
    }

    // comment added from viewer of post (user logged in)
    const addComment = async () => {
        const data = {
            ...post,
            comment: [
                ...post.comment,
                newComments
            ]
        };

        const res = await newComment(data);
        setText(res.data);
        setNewComments({ comment: '' })
    }

    useEffect(() => {
        returnPost();

        if (post?.user_id) returnUser();
    }, [
        postId,
        post?.user_id,
        text
    ]);

    return (
        <ConfirmDialog
            isOpen={open}
            openDialog={() => setOpen(true)}
            closeDialog={() => setOpen(false)}
            label={<ShortTextIcon />}
            title={user?.username}
            spacing={2}
        >
            <PostCard
                page="user"
                func={addComment}
                removeItem={removePost}
                change={handleChange}
                post={post}
                user={user}
                value={newComments?.comment}
                expand={true}
            />
        </ConfirmDialog>
    );
}