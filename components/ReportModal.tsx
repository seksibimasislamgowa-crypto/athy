import React, { useState, useEffect } from 'react';
import { InstitutionReport, InstitutionType } from '../types';
import { INSTITUTION_TYPES } from '../constants';
import { X } from 'lucide-react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (report: Omit<InstitutionReport, 'id'> | InstitutionReport) => void;
    reportToEdit: InstitutionReport | null;
}

type ValidatableFields = 'institutionName' | 'address' | 'operatorName' | 'supervisorName' | 'phone' | 'permitNumber';
type FormErrors = Partial<Record<ValidatableFields, string>>;


const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSave, reportToEdit }) => {
    const initialState: Omit<InstitutionReport, 'id'> = {
        institutionType: InstitutionType.TPQ,
        institutionName: '',
        address: '',
        operatorName: '',
        supervisorName: '',
        phone: '',
        permitNumber: '',
        maleStudents: 0,
        femaleStudents: 0,
        reportMonth: new Date().toISOString().slice(0, 7),
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.institutionName.trim()) newErrors.institutionName = 'Nama lembaga tidak boleh kosong.';
        if (!formData.address.trim()) newErrors.address = 'Alamat lembaga tidak boleh kosong.';
        if (!formData.operatorName.trim()) newErrors.operatorName = 'Nama operator tidak boleh kosong.';
        if (!formData.supervisorName.trim()) newErrors.supervisorName = 'Nama pembina tidak boleh kosong.';
        if (formData.phone && !/^\d+$/.test(formData.phone)) newErrors.phone = 'No. handphone harus berupa angka.';
        if (!formData.permitNumber.trim()) newErrors.permitNumber = 'Nomor izin operasional tidak boleh kosong.';
        
        return newErrors;
    };

    useEffect(() => {
        if (isOpen) {
            if (reportToEdit) {
                setFormData(reportToEdit);
            } else {
                setFormData(initialState);
            }
            setErrors({}); // Clear errors when modal opens or reportToEdit changes
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reportToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
        
        if (errors[name as ValidatableFields]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as ValidatableFields];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSave(formData);
    };

    const inputClass = (fieldName: ValidatableFields) => 
        `mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kemenag-primary focus:border-kemenag-primary ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`;

    const ErrorMessage: React.FC<{ fieldName: ValidatableFields }> = ({ fieldName }) =>
        errors[fieldName] ? <p className="text-red-600 text-xs mt-1">{errors[fieldName]}</p> : null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">{reportToEdit ? 'Edit Laporan' : 'Tambah Laporan Baru'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Fields */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Jenis Lembaga</label>
                            <select name="institutionType" value={formData.institutionType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kemenag-primary focus:border-kemenag-primary">
                                {INSTITUTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Nama Lembaga</label>
                            <input type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} required className={inputClass('institutionName')} />
                            <ErrorMessage fieldName="institutionName" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Alamat Lembaga</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} required rows={3} className={inputClass('address')} />
                             <ErrorMessage fieldName="address" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Operator</label>
                            <input type="text" name="operatorName" value={formData.operatorName} onChange={handleChange} required className={inputClass('operatorName')} />
                             <ErrorMessage fieldName="operatorName" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Pembina</label>
                            <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleChange} required className={inputClass('supervisorName')} />
                             <ErrorMessage fieldName="supervisorName" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">No. Handphone/WA</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass('phone')} placeholder="Contoh: 081234567890" />
                             <ErrorMessage fieldName="phone" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Izin Operasional</label>
                            <input type="text" name="permitNumber" value={formData.permitNumber} onChange={handleChange} required className={inputClass('permitNumber')} />
                             <ErrorMessage fieldName="permitNumber" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jumlah Santri Laki-laki</label>
                            <input type="number" name="maleStudents" value={formData.maleStudents} onChange={handleChange} min="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kemenag-primary focus:border-kemenag-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jumlah Santri Perempuan</label>
                            <input type="number" name="femaleStudents" value={formData.femaleStudents} onChange={handleChange} min="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kemenag-primary focus:border-kemenag-primary" />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Laporan Bulan</label>
                             <input type="month" name="reportMonth" value={formData.reportMonth} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kemenag-primary focus:border-kemenag-primary" />
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-kemenag-primary text-white rounded-md hover:bg-kemenag-dark">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
