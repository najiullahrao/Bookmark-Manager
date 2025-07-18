'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '', description: '' });

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/login');
      else {
        setUser(u);
        fetchBookmarks(u.uid);
      }
    });
    return () => unsub();
  }, []);

  const fetchBookmarks = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/bookmarks?userId=${userId}`);
      const data = await res.json();
      setBookmarks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createBookmark = async () => {
    if (!newBookmark.title || !newBookmark.url) return;
    const res = await fetch('http://localhost:3000/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBookmark, userId: user.uid }),
    });

    if (res.ok) {
      setNewBookmark({ title: '', url: '', description: '' });
      fetchBookmarks(user.uid);
    }
  };

  const deleteBookmark = async (id) => {
    await fetch(`http://localhost:3000/bookmarks/${id}`, { method: 'DELETE' });
    fetchBookmarks(user.uid);
  };

  const updateBookmark = async (id) => {
    await fetch(`http://localhost:3000/bookmarks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    fetchBookmarks(user.uid);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {user && (
        <p className="mb-4 text-gray-600">Logged in as <strong>{user.email}</strong></p>
      )}

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={newBookmark.title}
          onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="URL"
          value={newBookmark.url}
          onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={newBookmark.description}
          onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={createBookmark}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Bookmark
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks found.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((b) => (
            <li key={b.id} className="border p-4 rounded">
              {editingId === b.id ? (
                <div className="space-y-2">
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="border px-2 py-1 rounded w-full"
                  />
                  <input
                    value={editData.url}
                    onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                    className="border px-2 py-1 rounded w-full"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="border px-2 py-1 rounded w-full"
                  />
                  <button
                    onClick={() => updateBookmark(b.id)}
                    className="text-green-600 font-medium"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-semibold underline block"
                    >
                      {b.title}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">{b.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(b.id);
                        setEditData({ title: b.title, url: b.url, description: b.description });
                      }}
                      className="text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBookmark(b.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
