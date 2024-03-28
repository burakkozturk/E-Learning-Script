import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfileForm.css'; // CSS stilinizi buraya import edin
import { useAuth } from '../../context/AuthContext'; // AuthContext'inizi buraya import edin

function UpdateProfileForm() {
    const { currentUser, updateProfile } = useAuth(); // currentUser bilgisini ve bir updateProfile fonksiyonunu context'ten alın
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    // Kullanıcının mevcut bilgilerini form'a yüklemek için useEffect kullanın
    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                username: currentUser.username || '',
                password: '', // Güvenlik nedeniyle şifre her zaman boş bırakılmalı
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Profil güncelleme işlemini gerçekleştir
        try {
            await updateProfile(formData); // Bu fonksiyonun implementasyonunu AuthContext içinde yapmalısınız
            console.log("Profil güncellendi");
            navigate('/profile'); // Güncelleme başarılı ise profil sayfasına yönlendir
        } catch (error) {
            console.error("Profil güncellenirken hata oluştu:", error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-section">
                <form onSubmit={handleSubmit} className="register-form">
                    <h1>Update Profile</h1>
                    <div className="input-icon">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-icon">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-icon">
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password (leave blank to keep current)"
                            value={
                                formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfileForm;