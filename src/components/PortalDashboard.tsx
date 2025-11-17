'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, User } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import { useDocuments, UploadedDocument } from '@/contexts/DocumentContext';

const PortalContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/login');
      return;
    }
    const userData = auth.getUser();
    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {user.role === 'mdoner' ? <MDoNERDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};

// ----------------- MDoNER Dashboard -----------------
const MDoNERDashboard: React.FC = () => {
  const { getAllDocuments, updateDocumentStatus } = useDocuments();
  const [selectedFilter, setSelectedFilter] = useState<'all' | UploadedDocument['status']>('all');

  const allDocuments = getAllDocuments();
  const filteredDocuments = selectedFilter === 'all'
    ? allDocuments
    : allDocuments.filter(doc => doc.status === selectedFilter);

  const statusCounts = {
    pending: allDocuments.filter(doc => doc.status === 'pending').length,
    'under-review': allDocuments.filter(doc => doc.status === 'under-review').length,
    approved: allDocuments.filter(doc => doc.status === 'approved').length,
    rejected: allDocuments.filter(doc => doc.status === 'rejected').length,
    viewed: allDocuments.filter(doc => doc.status === 'viewed').length,
  };

  const handleStatusUpdate = (docId: string, newStatus: UploadedDocument['status']) => {
    const comments = {
      viewed: 'Document has been reviewed by admin.',
      'under-review': 'Document is currently under detailed review.',
      approved: 'Document meets all requirements and has been approved.',
      rejected: 'Document requires revisions. Please resubmit with corrections.',
    };
    updateDocumentStatus(
      docId,
      newStatus,
      comments[newStatus as keyof typeof comments],
      { name: 'MDoNER Admin', email: 'admin@mdoner.gov.in' }
    );
  };

  const getStatusBadge = (status: UploadedDocument['status']) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/30', icon: '⏳', label: 'Pending' },
      viewed: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500/30', icon: '👁️', label: 'Viewed' },
      'under-review': { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-500/30', icon: '🔍', label: 'Under Review' },
      approved: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/30', icon: '✅', label: 'Approved' },
      rejected: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/30', icon: '❌', label: 'Rejected' },
    };
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full">
      {/* Status Overview */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        {Object.entries(statusCounts).map(([key, count]) => {
          const icons = { pending: '⏳', 'under-review': '🔍', approved: '✅', rejected: '❌', viewed: '📊' };
          const colors = { pending: 'yellow', 'under-review': 'purple', approved: 'green', rejected: 'red', viewed: 'blue' };
          return (
            <div key={key} className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${colors[key as keyof typeof colors]}-600/20 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-2xl">{icons[key as keyof typeof icons]}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}</h3>
                  <p className="text-gray-400 text-sm">{key === 'viewed' ? 'Reviewed' : key === 'pending' ? 'New submissions' : key === 'under-review' ? 'Under assessment' : key === 'approved' ? 'Ready for implementation' : 'Need revisions'}</p>
                </div>
              </div>
              <div className={`text-${colors[key as keyof typeof colors]}-300 text-2xl font-bold`}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Filter & Document List */}
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
          >
            All Documents ({allDocuments.length})
          </button>
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status as UploadedDocument['status'])}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === status ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} ({count})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{doc.name}</h4>
                    <p className="text-gray-400 text-xs">{formatFileSize(doc.size)} • {formatDate(doc.uploadDate)}</p>
                    <p className="text-gray-500 text-xs">By: {doc.uploadedBy.name} ({doc.uploadedBy.email})</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              {doc.reviewerComments && (
                <div className="bg-black/20 border border-white/10 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Comments:</p>
                  <p className="text-gray-300 text-sm">{doc.reviewerComments}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <button onClick={() => handleStatusUpdate(doc.id, 'viewed')} className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium rounded transition-colors">Mark Viewed</button>
                  <button onClick={() => handleStatusUpdate(doc.id, 'under-review')} className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium rounded transition-colors">Start Review</button>
                  <button onClick={() => handleStatusUpdate(doc.id, 'approved')} className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs font-medium rounded transition-colors">Approve</button>
                  <button onClick={() => handleStatusUpdate(doc.id, 'rejected')} className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-medium rounded transition-colors">Reject</button>
                </div>
                <div className="text-xs text-gray-500">ID: {doc.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----------------- Client Dashboard -----------------
// ----------------- Client Dashboard -----------------

const ClientDashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'analyzing' | 'success' | 'error'
  >('idle');
  const [showPopup, setShowPopup] = useState(false);

  const [riskScore, setRiskScore] = useState(0);
  const [completeness, setCompleteness] = useState(0);

  const { addDocument, getClientDocuments } = useDocuments();
  const user = auth.getUser();
  const uploadedDocuments = user ? getClientDocuments(user.email) : [];

  // ----------- File Select --------------
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
      setShowPopup(false);
    }
  };
const [apiResponse, setApiResponse] = useState<any>(null);

  // ---------- Upload → API Call --------------
const handleUpload = async () => {
  if (!selectedFile || !user) return;

  try {
    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('http://localhost:8000/evaluate', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('API Error');

    const data = await res.json();

    // ---- SAVE JSON FIRST ----
    setApiResponse(data);
    setCompleteness(data.completeness);
    setRiskScore(data.risk);

    // ---- OPEN POPUP ----
    setShowPopup(true);

    // ---- THEN save document ----
    addDocument({
      name: selectedFile.name,
      size: selectedFile.size,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      reviewerComments: 'Document uploaded successfully. Awaiting review.',
      uploadedBy: {
        name: user.name,
        email: user.email,
        department: user.department,
      },
    });

    setUploadStatus('success');

  } catch (err) {
    console.error(err);
    setUploadStatus('error');
  }
};


  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setShowPopup(false);
  };

  // ----------- Formatting Helpers --------------
  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / k ** i).toFixed(2) + ' ' + sizes[i];
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // ----------------------------------------------
  return (
    <div className="w-full min-h-screen bg-black">
      <Navigation />

      {/* Upload Section */}
      <div className="w-full px-6 pt-32">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Add & Manage DPR Documents
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Upload your DPR documents for AI-powered quality assessment
          </p>

          {/* --------- Upload Box ---------- */}
          <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center mb-6 hover:border-blue-400/50 transition-colors duration-200">
            {!selectedFile ? (
              <div>
                <label htmlFor="file-upload" className="cursor-pointer text-white">
                  <span className="text-blue-300 hover:text-blue-400 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-300"> or drag and drop</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-gray-400 text-sm mt-2">PDF up to 10MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <p className="text-white font-medium">{selectedFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {Math.round(selectedFile.size / 1024)} KB
                  </p>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* -------- Upload Button -------- */}
          {selectedFile && (
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                disabled={
                  uploadStatus === 'uploading' || uploadStatus === 'analyzing'
                }
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  uploadStatus === 'uploading' || uploadStatus === 'analyzing'
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : uploadStatus === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {uploadStatus === 'uploading'
                  ? 'Uploading...'
                  : uploadStatus === 'analyzing'
                  ? 'Analyzing...'
                  : uploadStatus === 'success'
                  ? 'Upload Successful!'
                  : 'Upload Document'}
              </button>
            </div>
          )}

         {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={() => setShowPopup(false)}
    ></div>

    <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-12 max-w-xl mx-auto z-50">
      <h3 className="text-3xl font-bold text-white mb-6">
        API Response
      </h3>

      {/* File Name */}
      <p className="text-gray-300 mb-4 text-lg">
        File:{' '}
        <span className="font-semibold text-white">
          {selectedFile?.name}
        </span>
      </p>

      {/* Show full JSON */}
      <div className="bg-black/40 border border-white/20 rounded-xl p-4 mb-4 max-h-80 overflow-auto">
        <pre className="text-green-300 text-sm whitespace-pre-wrap">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="w-full mt-4 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}


          {/* -------- Uploaded Docs ---------- */}
          {uploadedDocuments.length > 0 && (
            <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Uploaded Documents
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Track the status of your DPR submissions
              </p>

              <div className="space-y-4">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">
                          {doc.name}
                        </h4>
                        <p className="text-gray-400 text-xs">
                          {formatFileSize(doc.size)} • Uploaded on{' '}
                          {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                    </div>

                    {doc.reviewerComments && (
                      <div className="bg-black/20 border border-white/10 rounded-lg p-3 mt-3">
                        <p className="text-xs text-gray-400 mb-1">
                          Reviewer Comments:
                        </p>
                        <p className="text-gray-300 text-sm">
                          {doc.reviewerComments}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default PortalContent;
