document.addEventListener('DOMContentLoaded', function () {
    // 自动更新年份
    document.getElementById('year').textContent = new Date().getFullYear();

    // 语言切换功能
    const langZhBtn = document.getElementById('lang-zh');
    const langEnBtn = document.getElementById('lang-en');
    let currentLang = 'zh'; // 默认中文

    // 切换语言函数
    function switchLanguage(lang) {
        currentLang = lang;

        // 更新按钮状态
        if (lang === 'zh') {
            langZhBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langZhBtn.classList.remove('active');
            langEnBtn.classList.add('active');
        }

        // 切换所有有data属性的元素
        document.querySelectorAll('[data-zh], [data-en]').forEach(element => {
            if (element.tagName === 'TITLE') {
                // 特殊处理title标签
                document.title = element.getAttribute(`data-${lang}`);
            } else if (element.hasAttribute(`data-${lang}`)) {
                // 处理其他元素
                const text = element.getAttribute(`data-${lang}`);
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // 更新html的lang属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    // 按钮点击事件
    langZhBtn.addEventListener('click', () => switchLanguage('zh'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));

    // 检查用户浏览器语言偏好
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('en')) {
        switchLanguage('en');
    }
});