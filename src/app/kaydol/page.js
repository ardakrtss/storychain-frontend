"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { moderateNickname } from "../../lib/moderation";
import { Eye, EyeOff } from 'lucide-react';

/* -------------------------------------------------------
   Basit Modal bileşeni (Tailwind ile)
------------------------------------------------------- */
function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    // ESC ile kapat
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* arka plan */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* kart */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed text-gray-800">
          {children}
        </div>
        <div className="flex justify-end gap-2 border-t px-5 py-3">
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Rumuz gereklidir";
    } else {
      // Moderasyon kontrolü
      const moderationResult = moderateNickname(formData.nickname.trim());
      if (!moderationResult.ok) {
        let errorMessage = moderationResult.reason;
        if (moderationResult.suggestions) {
          errorMessage += `\n\nÖneriler: ${moderationResult.suggestions.join(", ")}`;
        }
        newErrors.nickname = errorMessage;
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir email adresi giriniz";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signUp(
        formData.nickname.trim(),
        formData.email.trim().toLowerCase(),
        formData.password
      );
      
      if (result.success) {
        router.push('/profile');
      } else {
        setErrors({ general: result.error || 'Kayıt olurken bir hata oluştu' });
      }
    } catch (error) {
      console.error('Register error:', error);
      setErrors({ general: 'Kayıt olurken bir hata oluştu' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl">
            ✨
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hesap Oluştur
          </h2>
          <p className="text-gray-700">
            StoryChain'e katılın ve hikaye yazmaya başlayın!
          </p>
        </div>

        {/* Form Card - Vuexy Style */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Nickname Field */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-900 mb-3">
                Rumuz
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">👤</span>
                </div>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={formData.nickname}
                  onChange={handleChange}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                  className={`flex-1 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.nickname 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Rumuzunuzu girin"
                />
              </div>
              {errors.nickname && (
                <p className="mt-2 text-sm text-red-600 whitespace-pre-line">{errors.nickname}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-3">
                Email Adresi
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">📧</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                  className={`flex-1 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Email adresinizi girin"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-3">
                Şifre
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">🔒</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                    className={`w-full py-4 px-4 pr-12 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Şifrenizi girin"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-3">
                Şifre Tekrarı
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">🔐</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                    className={`w-full py-4 px-4 pr-12 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Privacy */}
            <div className="text-sm text-gray-600">
              <p>
                Kayıt olarak{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Kullanım Şartları
                </button>{" "}
                ve{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Gizlilik Politikası
                </button>{" "}
                nı kabul etmiş olursunuz.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Hesap Oluşturuluyor...
                </div>
              ) : (
                "Hesap Oluştur"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Zaten hesabınız var mı?{" "}
              <Link href="/nickname" className="text-purple-600 hover:text-purple-700 font-medium">
                Giriş Yapın
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <Modal open={showTerms} title="Kullanım Şartları" onClose={() => setShowTerms(false)}>
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">StoryChain Kullanım Şartları</h4>
          <p>Bu platformda hikaye yazarak aşağıdaki şartları kabul etmiş olursunuz:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Yazdığınız hikayeler uygun içerikte olmalıdır</li>
            <li>Telif hakkı ihlali yapmamalısınız</li>
            <li>Diğer kullanıcılara saygılı olmalısınız</li>
            <li>Platform kurallarına uymalısınız</li>
          </ul>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal open={showPrivacy} title="Gizlilik Politikası" onClose={() => setShowPrivacy(false)}>
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Gizlilik Politikası</h4>
          <p>Kişisel verileriniz güvenliğiniz için korunmaktadır:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email adresiniz sadece hesap yönetimi için kullanılır</li>
            <li>Hikayeleriniz diğer kullanıcılarla paylaşılır</li>
            <li>Verileriniz üçüncü taraflarla paylaşılmaz</li>
            <li>Hesabınızı istediğiniz zaman silebilirsiniz</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
