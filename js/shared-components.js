const sharedComponents = {
    getHeader: (isSubPage) => {
        const path = isSubPage ? "../" : "";
        
        // Lấy tên file hiện tại từ thanh địa chỉ (ví dụ: index.html)
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        // Hàm kiểm tra để trả về class phù hợp
        const getActiveClass = (pageName) => {
            return currentPage === pageName 
                ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" 
                : "text-slate-600 hover:text-blue-600 transition-all";
        };

        return `
        <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <nav class="max-w-4xl mx-auto p-4 flex justify-center gap-12 font-medium">
                <a href="${path}index.html" class="${getActiveClass('index.html')}">Trang chủ</a>
                <a href="${path}dia-danh.html" class="${getActiveClass('dia-danh.html')}">Địa danh</a>
                <a href="${path}lien-he.html" class="${getActiveClass('lien-he.html')}">Liên hệ</a>
            </nav>
        </header>
        `;
    },
    footer: `
    <footer class="bg-slate-900 text-white py-16 px-6 mt-20">
        <div class="max-w-4xl mx-auto text-center">
            <h3 class="text-2xl font-bold mb-4">Du lịch Kiên Giang</h3>
            <p class="text-slate-400 mb-8 font-light italic text-shadow-sm">Website giới thiệu các địa danh nổi bật</p>
            <div class="h-[1px] w-20 bg-blue-500 mx-auto mb-8 opacity-50"></div>
            <p class="text-slate-300 font-semibold mb-2">12A2 | Tin học 12</p>
            <p class="text-slate-500 text-sm italic">&copy; 2026 - Nhóm Vibe Coding</p>
        </div>
    </footer>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra nếu đang ở trong folder blogs
    const isSubPage = window.location.pathname.includes('/blogs/');
    
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) headerPlaceholder.innerHTML = sharedComponents.getHeader(isSubPage);
    if (footerPlaceholder) footerPlaceholder.innerHTML = sharedComponents.footer;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
});