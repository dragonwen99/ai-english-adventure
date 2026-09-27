# 账号体系部署步骤

1. 在 https://supabase.com/dashboard 新建 Supabase 项目。
2. 打开项目 SQL Editor，执行仓库内 supabase/schema.sql。表已启用 RLS，每位登录用户只能访问自己的词库。
3. Supabase → Project Settings → API（或新版 Connect/API Keys）复制 Project URL 和 publishable/anon key。**不要复制 service_role/secret key 到前端。**
4. Vercel → ai-english-adventure → Settings → Environment Variables，新增：
   - NEXT_PUBLIC_SUPABASE_URL = Supabase Project URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = Supabase publishable/anon key
   作用范围选择 Production（预览环境需要则一并选 Preview），保存后在 Deployments 重新部署。
5. Supabase → Authentication → URL Configuration：Site URL 设为 https://ai-english-adventure.vercel.app 。如果启用邮件确认，请在 Supabase 配置邮件发送服务；测试时也可先按项目实际需求选择邮箱验证策略。
6. 刷新网站：注册邮箱 → 登录 → 创建私人词库 → 选择学习。跨浏览器用同一账号登录可读取该账号保存的词库。

当前范围：邮箱注册/登录、独立词库增删、选择词库进入学习与闯关。尚未实现学习记录/学习计划的云端同步；这些数据目前只保存在当前页面状态。演示词库是公共示例，不是任何用户的私人数据。不要在公开环境中输入真实儿童个人资料进行测试。
