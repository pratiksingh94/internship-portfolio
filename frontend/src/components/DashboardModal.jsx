import { useState, useEffect } from "react";
import { MagicCard } from "./MagicCard";

const DashboardModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    profilePictureUrl: "",
    linkedinUrl: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
      if (!currentUser.isAdmin) {
        setSelectedMember(currentUser);
        setFormData({
          name: currentUser.name,
          title: currentUser.title,
          bio: currentUser.bio,
          profilePictureUrl: currentUser.profilePictureUrl,
          linkedinUrl: currentUser.linkedinUrl,
        });
      }
    }
  }, [isOpen, currentUser]);

  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/members");
      if (!res.ok) throw new Error("failed to fetch members");

      const data = await res.json();
      setMembers(data.filter((member) => !member.isAdmin));
    } catch {
      setError("failed to load members");
    }
  };

  const handleMemberSelect = (e) => {
    const member = members.find((m) => m._id === e.target.value);
    if (member) {
      setSelectedMember(member);
      setIsCreating(false);
      setFormData({
        name: member.name,
        title: member.title,
        bio: member.bio,
        profilePictureUrl: member.profilePictureUrl,
        linkedinUrl: member.linkedinUrl,
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/auth/create-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      await fetchMembers();
      setError("");
      setIsCreating(false);
      setFormData({
        name: "",
        title: "",
        bio: "",
        profilePictureUrl: "",
        linkedinUrl: "",
        username: "",
        password: "",
      });
      onUpdate();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/members/${selectedMember._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update member");
      }
      await fetchMembers();
      setError("");
      onUpdate();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/members/${selectedMember._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete member");
      }
      await fetchMembers();
      setSelectedMember(null);
      setFormData({
        name: "",
        title: "",
        bio: "",
        profilePictureUrl: "",
        linkedinUrl: "",
        username: "",
        password: "",
      });
      setError("");
      onUpdate();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsCreating(false);
      setSelectedMember(null);
      setFormData({
        name: "",
        title: "",
        bio: "",
        profilePictureUrl: "",
        linkedinUrl: "",
        username: "",
        password: "",
      });
    }
  }, [isOpen]);

  // Reset form state when user changes
  useEffect(() => {
    if (isOpen && !currentUser.isAdmin) {
      setError("");
      setIsCreating(false);
      setSelectedMember(currentUser);
      setFormData({
        name: currentUser.name,
        title: currentUser.title,
        bio: currentUser.bio,
        profilePictureUrl: currentUser.profilePictureUrl,
        linkedinUrl: currentUser.linkedinUrl,
      });
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <MagicCard
          className="w-full max-w-6xl bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(158,122,255,0.3)]"
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
          gradientSize={150}
          gradientOpacity={0.5}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {error && (
              <div className="text-red-500 mb-3 text-base">{error}</div>
            )}
            <div className="space-y-4">
              {currentUser.isAdmin && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <label className="block text-gray-300 mb-1 text-sm">
                      Select Member
                    </label>
                    <select
                      value={selectedMember?._id || ""}
                      onChange={handleMemberSelect}
                      className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      <option value="">Select a member...</option>
                      {members.map((member) => (
                        <option key={member._id} value={member._id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreating(true);
                      setSelectedMember(null);
                      setFormData({
                        name: "",
                        title: "",
                        bio: "",
                        profilePictureUrl: "",
                        linkedinUrl: "",
                        username: "",
                        password: "",
                      });
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm mt-6"
                  >
                    Create New Member
                  </button>
                </div>
              )}
              {(selectedMember || isCreating) && (
                <form onSubmit={isCreating ? handleCreate : handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      rows="2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        Profile Picture URL
                      </label>
                      <input
                        type="text"
                        name="profilePictureUrl"
                        value={formData.profilePictureUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                  </div>
                  {isCreating && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-3 pt-4">
                    {currentUser.isAdmin && selectedMember && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                      {isCreating ? "Create Member" : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </MagicCard>
      </div>
    </div>
  );
};

export default DashboardModal;
