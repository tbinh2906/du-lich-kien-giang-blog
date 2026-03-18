const sharedComponents = {
    // 1. Header (Giữ nguyên logic cũ của bạn)
    getHeader: (isSubPage) => {
        const path = isSubPage ? "../" : "";
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const getActiveClass = (pageName) => currentPage === pageName ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-slate-600 hover:text-blue-600 transition-all";

        return `
        <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <nav class="max-w-4xl mx-auto p-4 flex justify-center gap-12 font-medium">
                <a href="${path}index.html" class="${getActiveClass('index.html')}">Trang chủ</a>
                <a href="${path}dia-danh.html" class="${getActiveClass('dia-danh.html')}">Địa danh</a>
                <a href="${path}lien-he.html" class="${getActiveClass('lien-he.html')}">Liên hệ</a>
            </nav>
        </header>`;
    },

    // 2. Footer (Giữ nguyên)
    footer: `
    <footer class="bg-slate-50 border-t border-slate-100 pt-20 pb-10 px-6 font-sans">
        <div class="max-w-5xl mx-auto flex flex-col items-center">
            
            <div class="flex items-center gap-2 mb-4 group cursor-pointer">
                <div class="bg-slate-900 text-white p-1.5 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <i data-lucide="book-open-check" class="w-6 h-6"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Du lịch Kiên Giang</h3>
            </div>

            <p class="text-slate-500 text-center max-w-sm mb-10 leading-relaxed">
                Khám phá vẻ đẹp biển đảo, văn hóa và con người vùng đất Kiên Giang qua những góc nhìn mới mẻ.
            </p>

            <div class="w-full max-w-md mb-16">
                <div class="relative flex items-center">
                    <input type="email" placeholder="Nhận bản tin qua email..." 
                        class="w-full bg-slate-50 border border-slate-200 rounded-full py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <button class="absolute right-1.5 bg-slate-900 text-white p-2.5 rounded-full hover:bg-blue-600 transition-all shadow-lg">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>

            <div class="w-full h-[1px] bg-slate-100 mb-10"></div>

            <div class="w-full flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="text-slate-400 text-sm">
                    &copy; 2026 <span class="text-slate-900 font-semibold">Du lịch Kiên Giang</span>. All rights reserved.
                    <br class="md:hidden">
                    <span class="hidden md:inline mx-2 text-slate-200">|</span>
                    Crafted with <span class="text-red-500">❤️</span> by <span class="font-medium text-slate-600">Vibe Coding - 12A2</span>
                </div>

                <div class="flex items-center gap-6 text-slate-400">
                    <a href="#" class="hover:text-blue-600 transition-colors"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                    <a href="#" class="hover:text-blue-600 transition-colors"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                    <a href="#" class="hover:text-blue-600 transition-colors"><i data-lucide="youtube" class="w-5 h-5"></i></a>
                    <a href="#" class="hover:text-blue-600 transition-colors"><i data-lucide="github" class="w-5 h-5"></i></a>
                    <a href="#" class="hover:text-blue-600 transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                </div>
            </div>
        </div>
    </footer>`,

    // 3. Hàm tạo Mục lục (TOC)
    initTOC: () => {
        const tocContainer = document.getElementById('toc-placeholder');
        const article = document.getElementById('article-content');
        if (!tocContainer || !article) return;

        // Quét tất cả các thẻ tiêu đề từ h1 đến h4
        const headings = article.querySelectorAll('h1, h2, h3, h4');
        if (headings.length === 0) return;

        let tocHtml = `
            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12 shadow-sm">
                <button onclick="document.getElementById('toc-list').classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')" 
                        class="flex items-center justify-between w-full font-bold text-slate-800">
                    <span class="flex items-center gap-2"><i data-lucide="list"></i> Mục lục bài viết</span>
                    <i data-lucide="chevron-down" class="chevron transition-transform"></i>
                </button>
                <div id="toc-list" class="mt-4 space-y-1 border-t border-slate-200 pt-4">
        `;

        headings.forEach((h, i) => {
            // Tạo ID tự động nếu thẻ chưa có ID (để nhảy đến đúng đoạn)
            const id = h.id || `heading-${i}`;
            h.id = id;

            // Xác định độ lùi đầu dòng dựa trên cấp độ thẻ (tagName)
            let paddingClass = "";
            switch (h.tagName) {
                case 'H1': paddingClass = "font-bold text-slate-900"; break;
                case 'H2': paddingClass = "pl-4 text-slate-700 font-semibold"; break;
                case 'H3': paddingClass = "pl-8 text-slate-600 text-sm"; break;
                case 'H4': paddingClass = "pl-12 text-slate-500 text-xs italic"; break;
            }

            tocHtml += `
                <a href="#${id}" class="block hover:text-blue-600 transition py-1.5 ${paddingClass}">
                    ${h.innerText}
                </a>`;
        });

        tocHtml += `</div></div>`;
        tocContainer.innerHTML = tocHtml;
    },

    // 4. Hàm tạo Bài viết ngẫu nhiên
    initRelated: () => {
            const container = document.getElementById('related-placeholder');
            if (!container || typeof BLOG_POSTS === 'undefined') return;

            // 1. Lấy tên file hiện tại (ví dụ: bai-1.html)
            const currentFileName = window.location.pathname.split("/").pop();

            // 2. Lọc bỏ bài viết hiện tại khỏi danh sách hiển thị
            // Chúng ta kiểm tra nếu post.link chứa tên file hiện tại thì bỏ qua
            const filteredPosts = BLOG_POSTS.filter(post => !post.link.includes(currentFileName));

            // 3. Xáo trộn danh sách đã lọc và lấy 3 bài
            const shuffled = [...filteredPosts].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            container.innerHTML = `
                <div class="mt-24 mb-16">
                    <hr class="mx-auto border-slate-200 mb-16">
                    
                    <h2 style="font-family: 'Times New Roman', Times, serif;" 
                        class="text-4xl md:text-5xl font-bold mb-12 flex items-center justify-center gap-3 text-center text-slate-800">
                        Bài viết khác
                    </h2>

                    <div class="flex flex-col gap-8 max-w-4xl mx-auto">
                        ${selected.map(post => `
                            <div class="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group" 
                                onclick="window.location.href='../${post.link}'">
                                
                                <div class="md:w-2/5 h-48 md:h-auto overflow-hidden">
                                    <img src="../${post.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                                </div>
                                
                                <div class="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                    <div class="flex items-center gap-3 text-[10px] font-bold text-blue-600 mb-2 uppercase tracking-widest">
                                        <span class="bg-blue-50 px-2 py-0.5 rounded">${post.category || 'Khám phá'}</span>
                                        <span class="text-slate-300 font-normal underline decoration-slate-200 underline-offset-4">${post.date}</span>
                                    </div>
                                    
                                    <h3 class="text-xl md:text-2xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition">
                                        ${post.title}
                                    </h3>
                                    
                                    <p class="text-slate-500 leading-relaxed mb-4 line-clamp-2 text-sm">
                                        ${post.description}
                                    </p>
                                    
                                    <div class="flex items-center text-blue-600 font-bold text-xs gap-2">
                                        Đọc tiếp <i data-lucide="arrow-right" class="w-3 h-3 group-hover:translate-x-1 transition-transform"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
                
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
};

// Tự động chạy tất cả khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/blogs/');
    
    // Đổ Header/Footer
    if (document.getElementById('header-placeholder')) 
        document.getElementById('header-placeholder').innerHTML = sharedComponents.getHeader(isSubPage);
    if (document.getElementById('footer-placeholder')) 
        document.getElementById('footer-placeholder').innerHTML = sharedComponents.footer;
    
    // Chạy TOC và Related (chỉ dành cho trang bài viết)
    sharedComponents.initTOC();
    sharedComponents.initRelated();

    if (typeof lucide !== 'undefined') lucide.createIcons();
});