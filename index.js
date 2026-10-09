const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const PORT = process.env.PORT || 10000;
const TARGET_URL = 'https://femyarshop.maryamini102.workers.dev';

app.use('/', proxy(TARGET_URL, {
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    // حذف یا تنظیم مجدد هدرهای خاص در صورت نیاز
    return headers;
  },
  proxyReqOptDecorator(proxyReqOpts, srcReq) {
    // تنظیم هدر Host برای جلوگیری از خطاهای دامنه در کلودفلر
    proxyReqOpts.headers['Host'] = 'femyarshop.maryamini102.workers.dev';
    return proxyReqOpts;
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
