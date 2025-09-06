
import React from 'react';
import { Home, FileUp, Database } from 'lucide-react';

type ActiveMenu = 'dashboard' | 'files' | 'reports';

interface NavbarProps {
    activeMenu: ActiveMenu;
    setActiveMenu: (menu: ActiveMenu) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
            isActive
                ? 'bg-kemenag-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-kemenag-light hover:text-kemenag-dark'
        }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);


const Navbar: React.FC<NavbarProps> = ({ activeMenu, setActiveMenu }) => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto flex justify-center items-center p-2 space-x-2 md:space-x-4">
                <NavItem 
                    label="Statistik"
                    icon={<Home size={20} />}
                    isActive={activeMenu === 'dashboard'}
                    onClick={() => setActiveMenu('dashboard')}
                />
                <NavItem 
                    label="Upload File"
                    icon={<FileUp size={20} />}
                    isActive={activeMenu === 'files'}
                    onClick={() => setActiveMenu('files')}
                />
                <NavItem 
                    label="Laporan"
                    icon={<Database size={20} />}
                    isActive={activeMenu === 'reports'}
                    onClick={() => setActiveMenu('reports')}
                />
            </div>
        </nav>
    );
};

export default Navbar;
