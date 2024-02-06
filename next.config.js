// next.config.js
const nextConfig = {
  // next.js ile ilgili özel konfigürasyonları buraya ekleyebilirsiniz
};

module.exports = {
  webpack: (config, { isServer }) => {
    // Sadece sunucu tarafında çalışan kütüphaneleri yükleme
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  ...nextConfig,
};
