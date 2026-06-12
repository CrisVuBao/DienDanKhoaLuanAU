import { Link } from "react-router-dom";
import * as ServiceProjectApi from './../../../apiServieces/ProjectListApi'
import { useEffect, useState } from "react";
import intro1Img from '../../../Image/intro1.jpg';
import intro2Img from '../../../Image/intro2.jpg';
import intro3Img from '../../../Image/intro3.jpg';

function Home() {
    const [watchDataBig, setWatchDataBig] = useState(null)
    const [downloadDataBig, setdownloadDataBig] = useState(null)

    const fecthProjectGetThreeDataBig = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBig()
        setWatchDataBig(rs)
    }
    const fecthProjectGetThreeDataBigDownload = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBigDownload()
        setdownloadDataBig(rs)
    }
    
    useEffect(() => {
        fecthProjectGetThreeDataBig()
        fecthProjectGetThreeDataBigDownload()
    }, [])

    return (
        <main className="flex-grow">
            <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center bg-primary overflow-hidden">
                <img alt="Academic Background" className="absolute inset-0 w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF7jtOOjPZx-NqaSMYwA7MlCIps3gZXWpt6eS_6dGro6yKaJTfHCgcEXcH9Xy6zg8Fs9FkkV9MUDyqsRgyhEp_tKhfxyDwS9qyMZwdd67rOx8pScTVjvZW6ryf-Y2twI3i2MQTsZ_5H1Tll9P19qT9yMp8i6slz8e8hJ8uGhAIvqQmt8NYxwbITkKUYFzlwzBJ91L_PLCUhlFVCZTJvWNRHM7rKiii8UM-juCViJD6KzV4pjPxDlTpDtwDqEsZCfzIrKmHBERjkAQ" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-container/90"></div>
                <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center">
                    <h1 className="font-display-lg text-display-lg text-white mb-6 tracking-tight">
                        Diễn Đàn Chia Sẻ<br />Tài Liệu Đại Học
                    </h1>
                    <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl mb-10">
                        Nền tảng tri thức mở dành cho sinh viên và giảng viên. Khám phá, chia sẻ và cùng nhau phát triển trong môi trường học thuật hiện đại.
                    </p>
                    <div className="w-full max-w-2xl relative glass-panel rounded-full p-2 flex items-center shadow-lg">
                        <span className="material-symbols-outlined text-primary ml-4">search</span>
                        <input className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface font-body-lg text-body-lg px-4 py-3 placeholder-on-surface-variant" placeholder="Nhập tên tài liệu, môn học, mã học phần..." type="text" />
                        <button className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-full font-label-md text-label-md transition-colors shadow-md">
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-surface">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <div className="text-center mb-16">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Giới thiệu</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">Website diễn đàn chia sẻ tài liệu đại học</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to={'/forum'} className="bg-surface-container-lowest rounded-xl overflow-hidden doc-card-shadow doc-card-hover transition-all duration-300 block">
                            <div className="h-48 bg-primary/10 relative">
                                <img alt="Trao đổi thông tin" className="w-full h-full object-cover" src={intro1Img} />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Trao đổi thông tin</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">Môi trường mở để thảo luận, đặt câu hỏi và giải đáp các vấn đề học thuật một cách nhanh chóng.</p>
                            </div>
                        </Link>
                        <Link to={'/forum'} className="bg-surface-container-lowest rounded-xl overflow-hidden doc-card-shadow doc-card-hover transition-all duration-300 block">
                            <div className="h-48 bg-secondary/10 relative">
                                <img alt="Chia sẻ kinh nghiệm" className="w-full h-full object-cover" src={intro2Img} />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Chia sẻ kinh nghiệm</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">Kho tàng kinh nghiệm học tập, làm bài tập lớn, đồ án từ các thế hệ sinh viên đi trước.</p>
                            </div>
                        </Link>
                        <Link to={'/forum'} className="bg-surface-container-lowest rounded-xl overflow-hidden doc-card-shadow doc-card-hover transition-all duration-300 block">
                            <div className="h-48 bg-tertiary/10 relative">
                                <img alt="Định hướng nghiên cứu" className="w-full h-full object-cover" src={intro3Img} />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Định hướng nghiên cứu</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">Nguồn tài liệu tham khảo phong phú hỗ trợ cho các dự án nghiên cứu khoa học các cấp.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {watchDataBig && watchDataBig.length > 0 && (
                <section className="py-16 bg-background">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                                <h2 className="font-headline-md text-headline-md text-on-surface">Xem nhiều nhất</h2>
                            </div>
                            <Link className="font-label-md text-label-md text-primary hover:underline" to="/projects">Xem tất cả</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {watchDataBig.map((item, index) => (
                                <div key={index} className="bg-surface-container-lowest p-6 rounded-xl doc-card-shadow doc-card-hover transition-all border border-outline-variant/20 flex gap-4">
                                    <div className="w-16 h-20 bg-primary/5 rounded border border-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary">description</span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        <div>
                                            <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`}>
                                                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 hover:text-primary cursor-pointer transition-colors">{item.Name}</h3>
                                            </Link>
                                            <div className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-1 text-sm" dangerouslySetInnerHTML={{ __html: item.Discriptions }}></div>
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 font-label-md text-label-md text-outline">
                                            <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> {item.Watched}</div>
                                            <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">download</span> {item.Download}</div>
                                            <div className="flex items-center gap-1 ml-auto"><span className="material-symbols-outlined text-sm">calendar_today</span> {new Date(item.CreatedDate).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {downloadDataBig && downloadDataBig.length > 0 && (
                <section className="py-16 bg-surface">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>file_download</span>
                                <h2 className="font-headline-md text-headline-md text-on-surface">Tải nhiều nhất</h2>
                            </div>
                            <Link className="font-label-md text-label-md text-primary hover:underline" to="/projects">Xem tất cả</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {downloadDataBig.map((item, index) => (
                                <div key={index} className="bg-surface-container-lowest p-6 rounded-xl doc-card-shadow doc-card-hover transition-all border border-outline-variant/20 flex gap-4">
                                    <div className="w-16 h-20 bg-secondary/5 rounded border border-secondary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        <div>
                                            <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`}>
                                                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 hover:text-primary cursor-pointer transition-colors">{item.Name}</h3>
                                            </Link>
                                            <div className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-1 text-sm" dangerouslySetInnerHTML={{ __html: item.Discriptions }}></div>
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 font-label-md text-label-md text-outline">
                                            <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> {item.Watched}</div>
                                            <div className="flex items-center gap-1 text-secondary font-bold"><span className="material-symbols-outlined text-sm">download</span> {item.Download}</div>
                                            <div className="flex items-center gap-1 ml-auto"><span className="material-symbols-outlined text-sm">calendar_today</span> {new Date(item.CreatedDate).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export default Home;