function Footer() {
    return (
        <footer className="bg-inverse-surface dark:bg-surface-container-highest w-full relative bottom-0 mt-12 text-on-primary dark:text-on-surface font-body-md text-body-md">
            <div className="w-full px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-start gap-8 max-w-container-max mx-auto">
                <div className="flex flex-col gap-4 max-w-sm">
                    <span className="font-headline-md text-headline-md text-white">UNIBASE</span>
                    <p className="text-outline-variant">DIỄN ĐÀN CHIA SẺ TÀI LIỆU ĐẠI HỌC</p>
                    <p className="text-outline-variant text-sm mt-4">© 2026 UNIBASE - DIỄN ĐÀN CHIA SẺ TÀI LIỆU ĐẠI HỌC</p>
                </div>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-3 font-label-md text-label-md">
                        <a className="text-outline-variant hover:text-white transition-colors hover:underline" href="/">Về chúng tôi</a>
                        <a className="text-outline-variant hover:text-white transition-colors hover:underline" href="/">Điều khoản</a>
                        <a className="text-outline-variant hover:text-white transition-colors hover:underline" href="/">Chính sách bảo mật</a>
                        <a className="text-outline-variant hover:text-white transition-colors hover:underline" href="/">Liên hệ</a>
                    </div>
                    <div className="flex flex-col gap-3 font-label-md text-label-md">
                        <span className="text-white font-bold mb-2">MẠNG XÃ HỘI</span>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors" href="/">
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a className="w-10 h-10 bg-error rounded-full flex items-center justify-center text-white hover:bg-error-container hover:text-error transition-colors" href="/">
                                <span className="material-symbols-outlined">video_library</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;