# New Life RP - Web Panel (Demo)

هذه النسخة هي لوحة تحكم بسيطة لواجهة سيرفر **New Life RP**.
تعمل محليًا بدون قاعدة بيانات، وتأتي مع ملفات PHP بسيطة يمكن ربطها بقاعدة MySQL لاحقًا.

## المحتويات
- `index.html` — الصفحة الرئيسية (Landing)
- `dashboard.html` — لوحة التحكم (Register, BanList, TopRich, Tools, Complaints)
- `style.css`, `script.js`
- `data.json` — بيانات تجريبية لقائمة البان والأغنياء
- `api/` — ملفات PHP (stubs) للتكامل مع خادم PHP + MySQL
  - `config.php` — إعدادات DB
  - `register.php`, `banlist.php`, `toprich.php`, `complaint.php`

## طريقة التشغيل (سريع)
1. فك الملف واضعط على `index.html` لعرض الواجهة محليًا (Demo - بدون PHP).
2. لتشغيل الـ API (PHP) ضع المجلد على خادم يدعم PHP (مثل Apache) أو استضافة تدعم PHP.
   - تأكد من أن `api/config.php` يحتوي على بيانات الاتصال الصحيحة بقاعدة البيانات.
3. بعد رفع الملفات على الاستضافة، ادخل إلى `dashboard.html` لاختبار الوظائف.

## ربط مع قاعدة MySQL (SA-MP)
- خادم SA-MP عادة يستخدم MySQL لتخزين بيانات اللاعبين. يمكنك إنشاء جدول للمستخدمين وكتابة سكربت بسيط في `api/register.php` لعمل INSERT باستخدام PDO.
- المثال في `api/register.php` حاليا يقوم بتسجيل الطلبات في ملف `reg_log.txt` كنسخة تجريبية.

## ملاحظات أمنية
- لا تخزن كلمات المرور نصًا عاديًا في بيئة حقيقية — استخدم `password_hash()` في PHP و`password_verify()` للتحقق.
- استخدم HTTPS عند نشر الموقع لتأمين الشبكة.

---
إذا تحب، أقدر أعدّل `api/register.php` ليتصل فعليًا بقاعدة بياناتك — أعطني بيانات الاتصال (host, dbname, user, pass) وسأرسل نسخة جاهزة.
