
import React, { useState } from 'react';
import { InstitutionReport, InstitutionType, AppFile } from './types';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FileManagement from './components/FileManagement';
import ReportManagement from './components/ReportManagement';
import { MOCK_REPORTS } from './constants';

type ActiveMenu = 'dashboard' | 'files' | 'reports';

const App: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<ActiveMenu>('dashboard');
    const [reports, setReports] = useState<InstitutionReport[]>(MOCK_REPORTS);
    const [files, setFiles] = useState<AppFile[]>([]);
    const [editingReport, setEditingReport] = useState<InstitutionReport | null>(null);

    const handleAddReport = (report: Omit<InstitutionReport, 'id'>) => {
        const newReport: InstitutionReport = {
            ...report,
            id: Date.now(),
        };
        setReports(prev => [newReport, ...prev]);
    };

    const handleUpdateReport = (updatedReport: InstitutionReport) => {
        setReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
        setEditingReport(null);
    };

    const handleDeleteReport = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
            setReports(prev => prev.filter(r => r.id !== id));
        }
    };
    
    const handleEditReport = (report: InstitutionReport) => {
        setEditingReport(report);
        setActiveMenu('reports');
    };

    const handleAddFiles = (newFiles: File[]) => {
      const appFiles: AppFile[] = newFiles.map(file => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }));
      setFiles(prev => [...prev, ...appFiles]);
    };

    const handleDeleteFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <Dashboard reports={reports} />;
            case 'files':
                return <FileManagement files={files} onAddFiles={handleAddFiles} onDeleteFile={handleDeleteFile} />;
            case 'reports':
                return <ReportManagement 
                          reports={reports} 
                          onAddReport={handleAddReport} 
                          onUpdateReport={handleUpdateReport} 
                          onDeleteReport={handleDeleteReport} 
                          onEditReport={handleEditReport}
                          editingReport={editingReport}
                          clearEditing={() => setEditingReport(null)}
                       />;
            default:
                return <Dashboard reports={reports} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Header />
            <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <main className="p-4 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
