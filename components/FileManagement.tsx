
import React, { useRef } from 'react';
import { AppFile } from '../types';
import { UploadCloud, FileText, Download, Trash2, Image as ImageIcon } from 'lucide-react';

interface FileManagementProps {
    files: AppFile[];
    onAddFiles: (newFiles: File[]) => void;
    onDeleteFile: (id: string) => void;
}

const FileManagement: React.FC<FileManagementProps> = ({ files, onAddFiles, onDeleteFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onAddFiles(Array.from(event.target.files));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            onAddFiles(Array.from(event.dataTransfer.files));
        }
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    const FileIcon: React.FC<{ type: string }> = ({ type }) => {
        if (type.startsWith('image/')) {
            return <ImageIcon className="text-blue-500" size={24} />;
        }
        if (type === 'application/pdf') {
            return <FileText className="text-red-500" size={24} />;
        }
        return <FileText className="text-gray-500" size={24} />;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-700">Manajemen File</h2>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-kemenag-primary hover:bg-kemenag-light transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                />
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-kemenag-primary">Klik untuk upload</span> atau seret dan lepas file
                </p>
                <p className="text-xs text-gray-500">JPG, PNG, atau PDF</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">File Terupload</h3>
                {files.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Belum ada file yang diupload.</p>
                ) : (
                    <div className="space-y-3">
                        {files.map(file => (
                            <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                  <FileIcon type={file.type} />
                                  <div>
                                    <p className="font-medium text-gray-800 truncate max-w-xs md:max-w-md">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <a
                                        href={file.url}
                                        download={file.name}
                                        className="p-2 text-gray-600 hover:text-kemenag-primary hover:bg-gray-200 rounded-full transition"
                                        title="Download"
                                    >
                                        <Download size={20} />
                                    </a>
                                    <button
                                        onClick={() => onDeleteFile(file.id)}
                                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-100 rounded-full transition"
                                        title="Hapus"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileManagement;
