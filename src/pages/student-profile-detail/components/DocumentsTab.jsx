import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

const DocumentsTab = ({ documents }) => {
  const [documentList, setDocumentList] = useState(documents);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const fileInputRef = useRef(null);

  const documentTypes = [
    { value: 'Academic', label: 'Academic', icon: 'BookOpen', color: 'bg-primary-100 text-primary' },
    { value: 'Identity', label: 'Identity', icon: 'CreditCard', color: 'bg-secondary-100 text-secondary' },
    { value: 'Medical', label: 'Medical', icon: 'Heart', color: 'bg-error-100 text-error' },
    { value: 'Financial', label: 'Financial', icon: 'DollarSign', color: 'bg-success-100 text-success' },
    { value: 'Other', label: 'Other', icon: 'FileText', color: 'bg-accent-100 text-accent-600' }
  ];

  const getDocumentTypeInfo = (type) => {
    return documentTypes.find(dt => dt.value === type) || documentTypes[4];
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newDocument = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: 'Other',
        uploadDate: new Date().toISOString().split('T')[0],
        size: formatFileSize(file.size)
      };
      setDocumentList(prev => [...prev, newDocument]);
    });
    setShowUploadDialog(false);
  };

  const handleDownload = (document) => {
    // Mock download functionality
    console.log(`Downloading ${document.name}`);
  };

  const handleDelete = (documentId) => {
    setDocumentList(prev => prev.filter(doc => doc.id !== documentId));
  };

  const groupedDocuments = documentTypes.map(type => ({
    ...type,
    documents: documentList.filter(doc => doc.type === type.value)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Documents</h3>
        <button
          onClick={() => setShowUploadDialog(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
        >
          <Icon name="Upload" size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {documentTypes.map((type) => {
          const count = documentList.filter(doc => doc.type === type.value).length;
          return (
            <div key={type.value} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.color}`}>
                  <Icon name={type.icon} size={16} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{type.label}</p>
                  <p className="text-lg font-semibold text-text-primary">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {groupedDocuments.map((category) => (
          category.documents.length > 0 && (
            <div key={category.value} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                  <Icon name={category.icon} size={16} />
                </div>
                <h4 className="text-md font-semibold text-text-primary">{category.label} Documents</h4>
                <span className="text-sm text-text-secondary">({category.documents.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.documents.map((document) => (
                  <div key={document.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                          <Icon name="FileText" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-text-primary truncate">{document.name}</h5>
                          <p className="text-sm text-text-secondary">{document.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleDownload(document)}
                          className="p-1 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-smooth"
                          title="Download"
                        >
                          <Icon name="Download" size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(document.id)}
                          className="p-1 text-text-secondary hover:text-error hover:bg-error-50 rounded transition-smooth"
                          title="Delete"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary">
                      Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Empty State */}
      {documentList.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">No Documents</h4>
          <p className="text-text-secondary mb-4">Upload documents to get started</p>
          <button
            onClick={() => setShowUploadDialog(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
          >
            Upload First Document
          </button>
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1100 p-4">
          <div className="bg-surface rounded-xl shadow-elevated max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Upload Document</h3>
              <button
                onClick={() => setShowUploadDialog(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-primary-50 transition-smooth cursor-pointer"
              >
                <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
                <p className="text-text-primary font-medium mb-1">Click to upload files</p>
                <p className="text-sm text-text-secondary">or drag and drop</p>
                <p className="text-xs text-text-secondary mt-2">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadDialog(false)}
                  className="flex-1 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;