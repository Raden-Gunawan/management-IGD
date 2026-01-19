import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Username dan password harus diisi');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else if (data.user.role === 'medis') {
          window.location.href = '/medis/dashboard';
        }
      } else {
        setError(data.message || 'Login gagal. Periksa username dan password Anda.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Pastikan server backend berjalan.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          justify-content:center;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow-x: hidden;
        }

        .login-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .login-wrapper {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .login-container {
            padding: 16px;
          }

          .login-wrapper {
            max-width: 100%;
          }

          .login-card {
            padding: 30px 24px;
          }

          .login-header h1 {
            font-size: 28px;
          }

          .logo-circle {
            width: 70px;
            height: 70px;
          }

          .logo-icon {
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 12px;
          }

          .login-card {
            padding: 24px 20px;
          }

          .login-header h1 {
            font-size: 24px;
          }

          .login-header p {
            font-size: 14px;
          }

          .logo-circle {
            width: 60px;
            height: 60px;
            margin-bottom: 16px;
          }

          .logo-icon {
            width: 30px;
            height: 30px;
          }

          .login-card h2 {
            font-size: 20px;
          }

          .form-input {
            padding: 10px 14px;
            font-size: 14px;
          }

          .btn-login {
            padding: 12px;
            font-size: 15px;
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          background: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          color: white;
        }

        .login-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .login-header p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
        }

        .login-card h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 30px;
        }

        .error-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .error-icon {
          width: 20px;
          height: 20px;
          color: #dc2626;
          flex-shrink: 0;
        }

        .error-text {
          color: #991b1b;
          font-size: 14px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s;
          outline: none;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }

        .btn-login:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-login:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-login:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .footer-text {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .footer-copyright {
          font-size: 12px;
          color: #9ca3af;
        }

        .info-card {
          margin-top: 24px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 16px;
          backdrop-filter: blur(10px);
        }

        .info-text {
          font-size: 14px;
          color: #1f2937;
          text-align: center;
          line-height: 1.6;
        }

        .info-text strong {
          font-weight: 600;
        }
      `}</style>

      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header">
            <div className="logo-circle">
              <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1>Sistem Triage IGD</h1>
            <p>Instalasi Gawat Darurat</p>
          </div>

          <div className="login-card">
            <h2>Login</h2>

            {error && (
              <div className="error-alert">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="error-text">{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Masukkan username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Masukkan password"
                disabled={loading}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn-login"
            >
              {loading ? (
                <span className="btn-loading">
                  <div className="spinner" />
                  Memproses...
                </span>
              ) : (
                'Login'
              )}
            </button>

            <div className="login-footer">
              <p className="footer-text">Sistem Informasi Manajemen IGD</p>
              <p className="footer-copyright">© 2024 Rumah Sakit</p>
            </div>
          </div>

          <div className="info-card">
            <p className="info-text">
              <strong>Info:</strong> Pastikan Anda memiliki akses yang sah untuk menggunakan sistem ini.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}