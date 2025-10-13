'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  status: 'viewed' | 'under-review' | 'approved' | 'rejected' | 'pending';
  reviewerComments?: string;
  uploadedBy: {
    name: string;
    email: string;
    department: string;
  };
  reviewedBy?: {
    name: string;
    email: string;
  };
  reviewDate?: string;
}

interface DocumentContextType {
  documents: UploadedDocument[];
  addDocument: (document: Omit<UploadedDocument, 'id'>) => void;
  updateDocumentStatus: (id: string, status: UploadedDocument['status'], comments?: string, reviewedBy?: { name: string; email: string }) => void;
  getClientDocuments: (clientEmail: string) => UploadedDocument[];
  getAllDocuments: () => UploadedDocument[];
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: '1',
      name: 'Project_DPR_Northeast_Development.pdf',
      size: 2340000,
      uploadDate: '2025-10-08',
      status: 'approved',
      reviewerComments: 'All requirements met. Project approved for implementation.',
      uploadedBy: {
        name: 'Project Client',
        email: 'client.user@project.in',
        department: 'Project Stakeholder'
      },
      reviewedBy: {
        name: 'MDoNER Admin',
        email: 'admin@mdoner.gov.in'
      },
      reviewDate: '2025-10-09'
    },
    {
      id: '2',
      name: 'Infrastructure_Assessment_Report.docx',
      size: 1560000,
      uploadDate: '2025-10-09',
      status: 'under-review',
      reviewerComments: 'Currently being reviewed by technical team.',
      uploadedBy: {
        name: 'Project Client',
        email: 'client.user@project.in',
        department: 'Project Stakeholder'
      }
    },
    {
      id: '3',
      name: 'Environmental_Impact_Study.pdf',
      size: 3200000,
      uploadDate: '2025-10-10',
      status: 'viewed',
      reviewerComments: 'Document has been received and is in queue for review.',
      uploadedBy: {
        name: 'Project Client',
        email: 'client.user@project.in',
        department: 'Project Stakeholder'
      }
    }
  ]);

  const addDocument = (document: Omit<UploadedDocument, 'id'>) => {
    const newDocument: UploadedDocument = {
      ...document,
      id: Date.now().toString(),
    };
    setDocuments(prev => [newDocument, ...prev]);
  };

  const updateDocumentStatus = (
    id: string, 
    status: UploadedDocument['status'], 
    comments?: string,
    reviewedBy?: { name: string; email: string }
  ) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { 
            ...doc, 
            status, 
            reviewerComments: comments || doc.reviewerComments,
            reviewedBy: reviewedBy || doc.reviewedBy,
            reviewDate: new Date().toISOString().split('T')[0]
          }
        : doc
    ));
  };

  const getClientDocuments = (clientEmail: string) => {
    return documents.filter(doc => doc.uploadedBy.email === clientEmail);
  };

  const getAllDocuments = () => {
    return documents;
  };

  return (
    <DocumentContext.Provider value={{
      documents,
      addDocument,
      updateDocumentStatus,
      getClientDocuments,
      getAllDocuments
    }}>
      {children}
    </DocumentContext.Provider>
  );
};