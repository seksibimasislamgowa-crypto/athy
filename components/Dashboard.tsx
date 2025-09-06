
import React from 'react';
import { InstitutionReport, InstitutionType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Home, User, UserCheck } from 'lucide-react';

interface DashboardProps {
    reports: InstitutionReport[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
    const totalInstitutions = reports.length;
    const totalMaleStudents = reports.reduce((acc, r) => acc + r.maleStudents, 0);
    const totalFemaleStudents = reports.reduce((acc, r) => acc + r.femaleStudents, 0);
    const totalStudents = totalMaleStudents + totalFemaleStudents;

    const institutionTypeData = Object.values(InstitutionType).map(type => ({
        name: type,
        jumlah: reports.filter(r => r.institutionType === type).length,
    }));
    
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-700">Dashboard Statistik</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Lembaga" value={totalInstitutions} icon={<Home className="text-white" />} color="bg-blue-500" />
                <StatCard title="Total Santri" value={totalStudents} icon={<Users className="text-white" />} color="bg-green-500" />
                <StatCard title="Santri Laki-laki" value={totalMaleStudents} icon={<User className="text-white" />} color="bg-indigo-500" />
                <StatCard title="Santri Perempuan" value={totalFemaleStudents} icon={<UserCheck className="text-white" />} color="bg-pink-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Jumlah Lembaga Berdasarkan Jenis</h3>
                 <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={institutionTypeData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="jumlah" fill="#006400" name="Jumlah Lembaga"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
