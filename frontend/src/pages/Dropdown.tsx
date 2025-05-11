import React, { useState } from 'react';

const HomeContent = () => <div>首頁內容</div>;
const ProfileContent = () => <div>個人檔案</div>;
const SettingContent = () => <div>設定頁面</div>;

export default function Dropdown() {

    const [activePage, setActivePage] = useState('home');

    const handleSelectChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setActivePage(e.target.value);
    };

    return (

        <div>
            <div style={{ position: 'absolute', top: 16, right: 16}}>
                <select value={activePage} onChange={handleSelectChange}>
                    <option value="home">首頁</option>
                    <option value="profile">個人檔案</option>
                    <option value="settings">設定</option>
                </select>
            </div>

            <div style={{ padding: '60px 20px 20px 20px'}}>
                {activePage === 'home' && <HomeContent />}
                {activePage === 'profile' && <ProfileContent />}
                {activePage === 'settings' && <SettingContent />}
            </div>
        </div>



    );

}
