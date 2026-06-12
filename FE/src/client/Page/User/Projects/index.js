import { Link, useParams } from "react-router-dom";
import ProjectNewsRight from "../ProjectNewsRight";
import * as ServiceProjectListApi from "./../../../apiServieces/ProjectListApi";
import { useEffect, useState, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { NotificationContainer } from "react-notifications";
import { MyContext } from "../../../../App";

const itemsPerPage = 5;

function Projects() {
    const type = useContext(MyContext);
    const { urlDepartmentId, departmentName } = useParams();
    const [dataProjects, setDataProject] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const inputSearchRef = useRef("");
    const [checkActiveNewsRight, setCheckActiveNewsRight] = useState(true);
    const totalPages = Math.ceil(dataProjects?.length / itemsPerPage) || 0;

    const fecthProjectGetAll = async () => {
        const rs = await ServiceProjectListApi.GetAll();
        if (inputSearchRef.current) inputSearchRef.current.value = "";
        setCheckActiveNewsRight(false);
        setDataProject(rs);
    };

    const fecthDeparmentgetDataByNameAndKhoaId = async (projectName, deparmentId) => {
        // const rs = await ServiceProjectListApi.GetDataByNameAndKhoaId(projectName, deparmentId)
        // setDataProject(rs)
    };

    const fecthProjectByDeparmentId = async (deparmentId) => {
        const rs = await ServiceProjectListApi.GetByDepartmentId(deparmentId);
        if (inputSearchRef.current) inputSearchRef.current.value = "";
        setCheckActiveNewsRight(true);
        setDataProject(rs);
    };

    const fecthProjectGetByName = async (name) => {
        const rs = await ServiceProjectListApi.GetByName(name);
        if (rs) {
            setDataProject(rs);
        } else {
            setDataProject([]);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const renderProject = (item, index) => (
        <article key={index} className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col sm:flex-row gap-6 group hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div className="w-full sm:w-32 h-40 sm:h-auto shrink-0 bg-surface-container rounded-lg overflow-hidden relative border border-outline-variant/30 flex items-center justify-center">
                <div className="w-16 h-20 bg-white shadow-sm flex flex-col items-center justify-center p-2 relative">
                    <div className="w-full h-1 bg-primary mb-1"></div>
                    <div className="w-full h-0.5 bg-outline-variant/50 mb-1"></div>
                    <div className="w-full h-0.5 bg-outline-variant/50 mb-1"></div>
                    <div className="w-3/4 h-0.5 bg-outline-variant/50 self-start"></div>
                    <span className="material-symbols-outlined text-outline-variant absolute bottom-1 right-1 text-[16px]">description</span>
                </div>
            </div>
            <div className="flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                        <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`}>
                            <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">{item.Name}</h2>
                        </Link>
                        <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full shrink-0">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            <span className="font-label-md text-[12px] text-on-surface-variant">DOCX</span>
                        </div>
                    </div>
                    <div className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4" dangerouslySetInnerHTML={{ __html: item.Discriptions }}></div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-label-md text-label-md text-outline mt-auto pt-4 border-t border-outline-variant/20">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>{new Date(item.CreatedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                        <span>{item.UserName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        <span>{item?.Watched || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>{item?.Download || 0}</span>
                    </div>
                </div>
            </div>
        </article>
    );

    const handleSearch = async () => {
        if (inputSearchRef.current.value === "") {
            await fecthProjectGetAll();
            return;
        }
        if (type === "projectsByDeparmentId") {
            fecthDeparmentgetDataByNameAndKhoaId(
                inputSearchRef.current.value,
                urlDepartmentId
            );
        } else {
            await fecthProjectGetByName(inputSearchRef.current.value);
        }
    };

    const handleChangeInputSearch = (e) => { };

    useEffect(() => {
        if (type === "projectsByDeparmentId") {
            fecthProjectByDeparmentId(urlDepartmentId);
        } else {
            fecthProjectGetAll();
        }
    }, [type, urlDepartmentId]);

    return (
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
            <NotificationContainer />
            <section className="lg:col-span-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                        {type === "projectsByDeparmentId" ? departmentName : "Danh sách tài liệu"}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex items-center">
                            <input
                                ref={inputSearchRef}
                                type="text"
                                placeholder="Tìm kiếm..."
                                onChange={handleChangeInputSearch}
                                className="bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 pl-3 pr-8 font-label-md text-label-md focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto"
                            />
                            <button onClick={handleSearch} className="absolute right-2 p-1 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">search</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <span className="font-label-md text-label-md text-on-surface-variant hidden sm:inline">Sắp xếp:</span>
                            <select className="bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 pl-3 pr-8 font-label-md text-label-md focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer">
                                <option>Mới nhất</option>
                                <option>Xem nhiều</option>
                                <option>Tải nhiều</option>
                                <option>Tên A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                {dataProjects && dataProjects?.length > 0 ? (
                    dataProjects
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(renderProject)
                ) : (
                    <div className="text-center text-on-surface-variant py-8 font-body-lg">
                        Không có dữ liệu về tài liệu {departmentName}!
                    </div>
                )}

                {dataProjects && dataProjects.length !== 0 && (
                    <div className="flex justify-center items-center mt-8">
                        <ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageChange}
                            previousLabel={<span className="material-symbols-outlined">keyboard_double_arrow_left</span>}
                            nextLabel={<span className="material-symbols-outlined">keyboard_double_arrow_right</span>}
                            breakLabel="..."
                            containerClassName="flex justify-center items-center gap-2"
                            pageClassName=""
                            pageLinkClassName="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-label-md text-label-md"
                            previousClassName=""
                            previousLinkClassName="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                            nextClassName=""
                            nextLinkClassName="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                            breakClassName=""
                            breakLinkClassName="w-10 h-10 flex items-center justify-center text-on-surface-variant"
                            activeLinkClassName="!bg-primary !text-white !border-primary shadow-sm hover:!bg-primary hover:!text-white"
                        />
                    </div>
                )}
            </section>

            <ProjectNewsRight checkActiveNewsRight={checkActiveNewsRight} />
        </main>
    );
}

export default Projects;
