import { Link } from 'react-router-dom';
import * as ServiceProjectApi from './../../../apiServieces/ProjectListApi'
import { useState, useEffect } from 'react';
import * as ServiceDeparmentApi from './../../../apiServieces/Deparment'

function ProjectNews({ checkActiveNewsRight }) {
    const [watchDataBig, setWatchDataBig] = useState(null)
    const [downloadDataBig, setdownloadDataBig] = useState(null)
    const [dataDeparment, setDataDeparment] = useState(null)
    const [selectedLink, setSelectedLink] = useState(null);

    const fecthProjectGetThreeDataBig = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBig()
        setWatchDataBig(rs)
    }
    const fecthProjectGetThreeDataBigDownload = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBigDownload()
        setdownloadDataBig(rs)
    }
    const fecthDeparmentGetAll = async () => {
        const rs = await ServiceDeparmentApi.GetAll()
        setDataDeparment(rs)
    }
    useEffect(() => {
        fecthProjectGetThreeDataBig()
        fecthDeparmentGetAll()
        fecthProjectGetThreeDataBigDownload()
    }, [])

    const handleLinkClick = (index) => {
        setSelectedLink(index);
    };

    return (
        <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Categories Widget */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 overflow-hidden">
                <div className="bg-primary px-5 py-4">
                    <h3 className="font-headline-sm text-headline-sm text-white flex items-center gap-2">
                        <span className="material-symbols-outlined">category</span>
                        Tài liệu các khoa
                    </h3>
                </div>
                <div className="p-2 flex flex-col">
                    {dataDeparment && dataDeparment.length > 0 &&
                        dataDeparment.map((item, index) => (
                            <Link key={index} to={`/projects/${item.DepartmentId}/${item.Name}`}
                                className={`px-4 py-3 font-label-md text-label-md hover:bg-primary-container/10 hover:text-primary rounded-lg transition-colors border-b border-outline-variant/10 last:border-0 flex justify-between items-center group ${checkActiveNewsRight && selectedLink === index ? 'text-primary bg-primary-container/10' : 'text-on-surface'}`}
                                onClick={() => handleLinkClick(index)}
                            >
                                {item.Name}
                                <span className="material-symbols-outlined text-[16px] text-outline opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">chevron_right</span>
                            </Link>
                        ))
                    }
                </div>
            </div>

            {/* Most Viewed Widget */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 overflow-hidden">
                <div className="bg-surface-container-high px-5 py-4 border-b border-outline-variant/20">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                        Xem nhiều nhất
                    </h3>
                </div>
                <div className="flex flex-col">
                    {watchDataBig && watchDataBig.length > 0 && watchDataBig.map((item, index) => (
                        <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} key={index} className="p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 group">
                            <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary line-clamp-2 mb-2">{item.Name}</h4>
                            <div className="flex items-center gap-4 text-outline font-label-md text-[12px]">
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span>{item.UserName}</div>
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span>{item.Watched}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Most Downloaded Widget */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 overflow-hidden">
                <div className="bg-surface-container-high px-5 py-4 border-b border-outline-variant/20">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">cloud_download</span>
                        Tải nhiều nhất
                    </h3>
                </div>
                <div className="flex flex-col">
                    {downloadDataBig && downloadDataBig.length > 0 && downloadDataBig.map((item, index) => (
                        <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} key={index} className="p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 group">
                            <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary line-clamp-2 mb-2">{item.Name}</h4>
                            <div className="flex items-center gap-4 text-outline font-label-md text-[12px]">
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span>{item.UserName}</div>
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">download</span>{item.Download}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default ProjectNews;