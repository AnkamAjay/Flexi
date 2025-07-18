import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import BlogPostForm from './BlogPostForm';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import Layout from './Layout';
import NavBar from './NavBar';

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: '<p>React is a JavaScript library for building user interfaces. This post will help you get started with React and build your first application.</p>',
    author: 'Jane Doe',
    date: '2023-01-01',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: '<p>Both CSS Grid and Flexbox are powerful layout systems. This post compares their use cases and best practices.</p>',
    author: 'John Smith',
    date: '2023-02-15',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: '<ul><li>Use semantic HTML</li><li>Provide alt text for images</li><li>Ensure sufficient color contrast</li></ul>',
    author: 'Alex Lee',
    date: '2023-03-10',
  }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Create a new post
  const handleCreate = (data) => {
    const newId = (Date.now()).toString();
    const newPost = {
      ...data,
      id: newId,
      summary: data.content.replace(/<[^>]+>/g, '').slice(0, 80) + (data.content.length > 80 ? '...' : ''),
    };
    setPosts(prev => [...prev, newPost]);
    navigate(`/posts/${newId}`);
  };

  // Update an existing post
  const handleUpdate = (id, data) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, ...data, summary: data.content.replace(/<[^>]+>/g, '').slice(0, 80) + (data.content.length > 80 ? '...' : '') } : post));
    navigate(`/posts/${id}`);
  };

  // Delete a post
  const handleDelete = async (id) => {
    setDeleting(true);
    setTimeout(() => { // Simulate async
      setPosts(prev => prev.filter(post => post.id !== id));
      setDeleting(false);
      setDeleteId(null);
      navigate('/');
    }, 700);
  };

  // Find a post by id
  const findPost = (id) => posts.find(post => post.id === id);

  // Filter posts by search query
  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <Layout>
      <NavBar onSearch={setSearchQuery} />
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:800,margin:'40px auto 0',padding:'0 40px'}}>
        <h1 style={{margin:0}}>Blog Posts</h1>
        <Link to="/posts/new" style={{background:'#007BFF',color:'#fff',padding:'10px 20px',borderRadius:4,textDecoration:'none',fontWeight:'bold'}}>New Post</Link>
      </header>
      <Routes>
        <Route path="/" element={<BlogPostList posts={filteredPosts.map(p => ({ ...p, url: `/posts/${p.id}` }))} />} />
        <Route path="/posts/new" element={<BlogPostForm onSubmit={handleCreate} />} />
        <Route path="/posts/:id/edit" element={<EditWrapper findPost={findPost} onUpdate={handleUpdate} />} />
        <Route path="/posts/:id" element={<DetailWrapper findPost={findPost} onDelete={setDeleteId} />} />
      </Routes>
      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        loading={deleting}
      />
    </Layout>
  );
}

function DetailWrapper({ findPost, onDelete }) {
  const { id } = useParams();
  const post = findPost(id);
  if (!post) return <p>Blog post not found.</p>;
  return (
    <div>
      <BlogPostDetail {...post} />
      <div style={{maxWidth:800,margin:'0 auto',padding:'0 40px 40px',display:'flex',gap:16}}>
        <Link to={`/posts/${id}/edit`} style={{background:'#007BFF',color:'#fff',padding:'8px 18px',borderRadius:4,textDecoration:'none',fontWeight:'bold'}} replace>Edit Post</Link>
        <DeleteButton onClick={() => onDelete(id)} />
      </div>
    </div>
  );
}

function EditWrapper({ findPost, onUpdate }) {
  const { id } = useParams();
  const post = findPost(id);
  if (!post) return <p>Blog post not found.</p>;
  return <BlogPostForm post={post} onSubmit={data => onUpdate(id, data)} />;
}

export default App;