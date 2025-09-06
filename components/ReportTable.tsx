
import React from 'react';
import { InstitutionReport } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface ReportTableProps {
    reports: InstitutionReport[];
    onEdit: (report: InstitutionReport) => void;
    onDelete: (id: number) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({ reports, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nama Lembaga</th>
                        <th scope="col" className="px-6 py-3">Jenis</th>
                        <th scope="col" className="px-6 py-3">Bulan Laporan</th>
                        <th scope="col" className="px-6 py-3">Operator</th>
                        <th scope="col" className="px-6 py-3">Total Santri</th>
                        <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-8 text-gray-500">
                                Tidak ada data laporan.
                            </td>
                        </tr>
                    ) : (
                        reports.map((report) => (
                            <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {report.institutionName}
                                </th>
                                <td className="px-6 py-4">{report.institutionType}</td>
                                <td className="px-6 py-4">{report.reportMonth}</td>
                                <td className="px-6 py-4">{report.operatorName}</td>
                                <td className="px-6 py-4">{report.maleStudents + report.femaleStudents}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => onEdit(report)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(report.id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
