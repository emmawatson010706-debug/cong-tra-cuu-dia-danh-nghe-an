import React from 'react';
import { MapPin, Search } from 'lucide-react';

export function Logo({ small = false }) {
  return (
    <div className={`brand-logo ${small ? 'brand-logo--small' : ''}`} aria-label="NATA">
      <div className="logo-ring">
        <MapPin size={small ? 20 : 28} />
        <Search size={small ? 13 : 16} className="logo-search" />
      </div>
      <b>NATA</b>
    </div>
  );
}
