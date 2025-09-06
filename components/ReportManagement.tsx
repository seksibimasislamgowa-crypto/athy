import React, { useState, useMemo } from 'react';
import { InstitutionReport, InstitutionType } from '../types';
import ReportTable from './ReportTable';
import ReportModal from './ReportModal';
import { PlusCircle, Download, Search, Filter } from 'lucide-react';
import { exportToPdf, exportToExcel } from '../services/exportService';
import { INSTITUTION_TYPES } from '../constants';

interface ReportManagementProps {
    reports: InstitutionReport[];
    onAddReport: (report: Omit<InstitutionReport, 'id'>) => void;
    onUpdateReport: (report: InstitutionReport) => void;
    onDeleteReport: (id: number) => void;
    onEditReport: (report: InstitutionReport) => void;
    editingReport: InstitutionReport | null;
    clearEditing: () => void;
}

const ReportManagement: React.FC<ReportManagementProps> = (props) => {
    const { reports, onAddReport, onUpdateReport, onDeleteReport, onEditReport, editingReport, clearEditing } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterMonth, setFilterMonth] = useState('all');

    const handleOpenModalForAdd = () => {
        clearEditing();
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (report: InstitutionReport) => {
        onEditReport(report);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearEditing();
    };

    const handleSaveReport = (reportData: Omit<InstitutionReport, 'id'> | InstitutionReport) => {
        if ('id' in reportData) {
            onUpdateReport(reportData);
        } else {
            onAddReport(reportData);
        }
        handleCloseModal();
    };
    
    const uniqueMonths = useMemo(() => {
        const months = new Set(reports.map(r => r.reportMonth));
        return Array.from(months).sort().reverse();
    }, [reports]);

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = report.institutionName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || report.institutionType === filterType;
            const matchesMonth = filterMonth === 'all' || report.reportMonth === filterMonth;
            return matchesSearch && matchesType && matchesMonth;
        });
    }, [reports, searchTerm, filterType, filterMonth]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-700">Manajemen Laporan</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleOpenModalForAdd}
                        className="flex items-center gap-2 bg-kemenag-primary text-white px-4 py-2 rounded-lg shadow hover:bg-kemenag-dark transition-colors"
                    >
                        <PlusCircle size={20} />
                        <span>Tambah Laporan</span>
                    </button>
                    <button
                        onClick={() => exportToPdf(filteredReports)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
                    >
                        <Download size={20} />
                        <span>PDF</span>
                    </button>
                    <button
                        onClick={() => exportToExcel(filteredReports)}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
                    >
                        <Download size={20} />
                        <span>Excel</span>
                    </button>
                </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
                 <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama lembaga..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-kemenag-primary focus:border-kemenag-primary"
                    />
                </div>
                 <div className="relative w-full md:w-auto flex-grow">
                     <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                     <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-kemenag-primary focus:border-kemenag-primary"
                     >
                        <option value="all">Semua Jenis</option>
                        {INSTITUTION_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                 <div className="relative w-full md:w-auto flex-grow">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                     <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-kemenag-primary focus:border-kemenag-primary"
                     >
                        <option value="all">Semua Bulan</option>
                        {uniqueMonths.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>


            <ReportTable 
                reports={filteredReports} 
                onEdit={handleOpenModalForEdit} 
                onDelete={onDeleteReport} 
            />

            {isModalOpen && (
                <ReportModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveReport}
                    reportToEdit={editingReport}
                />
            )}
        </div>
    );
};

export default ReportManagement;