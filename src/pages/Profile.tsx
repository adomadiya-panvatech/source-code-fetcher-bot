
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { User, Camera, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from 'lucide-react';
import { useProfile, useUpdateProfile } from '@/hooks/useAuth';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    location: '',
    bio: '',
  });

  React.useEffect(() => {
    if (profileData) {
      const nameParts = profileData.name?.split(' ') || [];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        position: profileData.position || 'Sales Manager',
        department: profileData.department || 'Sales',
        location: profileData.location || 'New York, NY',
        bio: profileData.bio || 'Experienced sales professional with over 10 years in B2B sales and customer relationship management.',
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const profileUpdate = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };
      
      await updateProfileMutation.mutateAsync(profileUpdate);
      setIsEditing(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            Loading profile...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your personal information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border-2 border-white dark:border-slate-700">
                  <Camera className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-1">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{formData.position}</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">{formData.department}</p>
              
              <div className="mt-6 pt-6 border-t border-white/20 dark:border-slate-700/30">
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Personal Information</h3>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={updateProfileMutation.isPending}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{updateProfileMutation.isPending ? 'Saving...' : 'Save'}</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
