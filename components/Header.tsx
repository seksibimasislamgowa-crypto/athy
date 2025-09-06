
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-kemenag-primary text-white p-4 shadow-md">
            <div className="container mx-auto text-center">
                <h1 className="text-xl md:text-3xl font-bold tracking-wider">
                    PADAELO (PANGKALAN DATA ELEKTRONIK LAPORAN OBYEKTIF)
                </h1>
                <p className="text-sm md:text-lg text-kemenag-secondary font-semibold">
                    TPQ/TPA, MADRASAH DINIYAH TAKMILIYAH (MDT), RUMAH TAHFIDZ AL QUR'AN (RTQ), PAUDQU
                </p>
                 <p className="text-xs md:text-sm mt-1">
                    SEKSI PD PONTREN KEMENAG GOWA
                </p>
            </div>
        </header>
    );
};

export default Header;
