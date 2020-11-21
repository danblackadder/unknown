import React from 'react';

import {
    MdNotificationsNone,
    MdSearch,
} from 'react-icons/md';

const Search = () => {
    return (
        <div className="background-secondary flex-row align-items-center padding-vertical-16 padding-horizontal-32" style={{ borderRadius: '8px' }}>
            <MdSearch size={24} />
            <input type="text" className="padding-8 background-secondary white font-size-16 margin-horizontal-8 flex-1 placeholder-white" placeholder="Search" />
            <MdNotificationsNone size={24} className="margin-right-16 cursor-pointer" />
            <div className="cursor-pointer" style={{ borderRadius: '100%', height: '28px', width: '28px', backgroundColor: '#fff' }} />
        </div>
    );
};

export default Search;