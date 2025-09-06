import { InstitutionReport } from '../types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// FIX: The manual module augmentation for 'jspdf' has been removed.
// The 'jspdf-autotable' library, when imported, automatically provides the necessary
// type definitions for the .autoTable() method, making a manual declaration unnecessary and causing build errors.

export const exportToPdf = (reports: InstitutionReport[]) => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Jenis", "Nama Lembaga", "Alamat", "Operator", "Pembina", "Telepon", "Izin", "Santri L", "Santri P", "Bulan"];
    const tableRows: (string | number)[][] = [];

    reports.forEach(report => {
        const reportData = [
            report.id,
            report.institutionType,
            report.institutionName,
            report.address,
            report.operatorName,
            report.supervisorName,
            report.phone,
            report.permitNumber,
            report.maleStudents,
            report.femaleStudents,
            report.reportMonth,
        ];
        tableRows.push(reportData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 100, 0] }, // Kemenag Green
    });
    
    doc.text("Laporan Lembaga Pendidikan Al Qur'an - Kemenag Gowa", 14, 15);
    doc.save("laporan_padaelo.pdf");
};

export const exportToExcel = (reports: InstitutionReport[]) => {
    const worksheetData = reports.map(report => ({
        'ID Laporan': report.id,
        'Jenis Lembaga': report.institutionType,
        'Nama Lembaga': report.institutionName,
        'Alamat': report.address,
        'Nama Operator': report.operatorName,
        'Nama Pembina': report.supervisorName,
        'No. HP/WA': report.phone,
        'No. Izin Operasional': report.permitNumber,
        'Santri Laki-laki': report.maleStudents,
        'Santri Perempuan': report.femaleStudents,
        'Total Santri': report.maleStudents + report.femaleStudents,
        'Bulan Laporan': report.reportMonth,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    
    // Auto-fit columns
    const max_width = worksheetData.reduce((w, r) => Math.max(w, ...Object.values(r).map(v => String(v).length)), 10);
    worksheet["!cols"] = Object.keys(worksheetData[0] || {}).map(() => ({ wch: max_width }));

    XLSX.writeFile(workbook, "laporan_padaelo.xlsx");
};
