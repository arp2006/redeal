import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { API } from "../config/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [original, setOriginal] = useState(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  /* ---------- fetch ---------- */

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/api/items/${id}/edit`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 401 || res.status === 403) {
        navigate("/");
        return;
      }

      if (!res.ok) throw new Error();

      const data = await res.json();

      const mapped = {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        category_id: data.category_id,
        images: data.images
      };

      setPost(mapped);
      setOriginal(mapped);
    } catch {
      setError("Failed to load post");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchPost();
    return () => previews.forEach(URL.revokeObjectURL);
  }, []);

  /* ---------- handlers ---------- */

  const handleChange = (e) => {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImages = (e) => {
    previews.forEach(URL.revokeObjectURL);
    const files = [...e.target.files].slice(0, 5);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      setError("Password is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ password: deletePassword })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Delete failed");
        return;
      }

      setSuccess("Post deleted successfully");
      setTimeout(() => navigate("/"), 1200);
    } catch {
      setError("Network error");
    }
  };

  const hasChanges =
    post &&
    original &&
    (
      post.title !== original.title ||
      post.description !== original.description ||
      post.price !== original.price ||
      post.location !== original.location ||
      post.category_id !== original.category_id ||
      images.length > 0
    );

  const handleReset = () => {
    if (!original) return;
    setPost(original);
    setImages([]);
    previews.forEach(URL.revokeObjectURL);
    setPreviews([]);
    setError("");
  };

  /* ---------- submit ---------- */

  const handleSubmit = async (e) => {
    if (saving) return;
    e.preventDefault();
    setError("");
    if (!hasChanges) {
      setError("No changes to save");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      let imageUrls;
      if (images.length > 0) {
        const fd = new FormData();
        images.forEach(img => fd.append("images", img));
        const up = await fetch(`${API}/api/upload-images`, {
          method: "POST",
          body: fd
        });
        const data = await up.json();
        imageUrls = data.imageUrls;
      }
      const res = await fetch(
        `${API}/api/items/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...post,
            images: imageUrls ?? undefined
          })
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Update failed");
        return;
      }
      navigate(`/product/${id}`);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) return <p>Loading…</p>;
  if (!post) return null;
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <main className="p-4 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-wrap justify-between gap-3 mb-8">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#0d171b] text-4xl font-black leading-tight tracking-[-0.033em]">
                  Edit Your Sales Post
                </p>
                <p className="text-[#4c809a] text-base font-normal leading-normal">
                  Edit the details of your item for sale.
                </p>
              </div>
            </div>

            {/* -------- title & description -------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Product Title</p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Description</p>
                  <textarea
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] min-h-36 placeholder:text-[#4c809a] p-[15px] text-base font-normal leading-normal"
                    placeholder="Describe the item's condition, features, and any flaws..."
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* -------- images -------- */}
              <div className="flex flex-col space-y-6">
                <label className="flex flex-col  min-w-40">
                  <p className="text-base font-medium pb-2">Upload Images</p>
                  <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-[#cfdfe7]">
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      multiple
                      type="file"
                      accept="image/*"
                      onChange={handleImages}
                    />
                    <span className="material-symbols-outlined text-4xl text-[#4c809a]">
                      upload_file
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previews.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        className="h-24 object-cover rounded-lg"
                        alt=""
                      />
                    ))}
                  </div>
                </label>
              </div>
            </div>

            {/* -------- price / category / location -------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#cfdfe7]">
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Price</p>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4c809a]">₹</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 placeholder:text-[#4c809a] pl-8 p-[15px] text-base font-normal leading-normal"
                    placeholder="0.00"
                    value={post.price}
                    onChange={handleChange}
                    name="price"
                  />
                </div>
              </label>

              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Category</p>
                <select
                  className="form-select appearance-none flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 p-[15px] text-base font-normal leading-normal pr-10"
                  name="category_id"
                  value={post.category_id}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="1">Electronics</option>
                  <option value="2">Books</option>
                  <option value="3">Games</option>
                </select>
              </label>

              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Location</p>
                <input
                  className="form-select appearance-none flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-[#0d171b] focus:outline-0 focus:ring-0 border border-[#cfdfe7] bg-slate-50 focus:border-[#4385a5] h-14 p-[15px] text-base font-normal leading-normal pr-10"
                  name="location"
                  value={post.location}
                  onChange={handleChange}
                />
              </label>
            </div>

            {error && (
              <div className="text-red-600 font-semibold">{error}</div>
            )}

            {/* -------- actions -------- */}
            <div className="flex items-center justify-between pt-6 border-t border-[#cfdfe7]">
              {/* LEFT: destructive action */}
              <button
                type="button"
                onClick={() => { setShowDeleteModal(true) }}
                disabled={saving}
                className="h-12 px-6 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-600 transition"
              >
                Delete post
              </button>
              {/* RIGHT: secondary + primary actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-12 px-6 rounded-lg cursor-pointer text-[#4c809a] hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasChanges || saving}
                  className="h-12 px-6 rounded-lg bg-[#e7eff3] cursor-pointer text-black hover:bg-slate-200 transition"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={!hasChanges || saving}
                  className="h-12 px-6 rounded-lg bg-[#3498DB] cursor-pointer text-white hover:bg-[#0a6bab] transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h3 className="text-lg font-bold text-[#0d171b]">Enter Account Password</h3>
            <p className="text-sm text-slate-600 mt-2">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <p className="text-sm text-slate-600 mt-2 font-extrabold">
              User: {post.name}
            </p>
            <input
              className="form-input w-full my-4 rounded-lg bg-slate-50 p-3"
              placeholder="Password"
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              required
            />
            <div className="mt-6 flex justify-end gap-3">
              {!success && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword("");
                      setError("");
                    }}
                    className="px-4 py-2 rounded-md text-sm cursor-pointer hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white text-sm cursor-pointer hover:bg-red-400 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            {error && <p className="text-red-600 mt-[7px] text-center">{error}</p>}
            {success && <p className="text-grey-600 mt-[7px] text-center">{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPost;
