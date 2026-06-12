import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { useRef } from "react";
import * as ServiceUser from './../../../../../apiServieces/UserApi'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function Header() {
    const model = useRef()
    const userNameRef = useRef()
    const passRef = useRef()
    const handleModel = () => {
        model.current.style.display = 'block'
        userNameRef.current.focus()
    }
    const handleModelClose = () => {
        model.current.style.display = 'none'
    }
    const handleLogOut = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('name')
        localStorage.removeItem('userId');
        localStorage.removeItem('statusLogin')
        localStorage.removeItem('UserGroup')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        userNameRef.current.value = ''
        passRef.current.value = ''
        window.location.reload()
    }
    const handleLogin = async () => {

        const rs = await ServiceUser.GetByUserName(userNameRef.current.value, passRef.current.value)
        if (rs && rs.Token) {
            const user = rs.User;
            localStorage.setItem('token', rs.Token);
            localStorage.setItem('statusLogin', 'login')
            localStorage.setItem('name', user.Name);
            localStorage.setItem('userId', user.Id);
            localStorage.setItem('UserGroup', user.Roles ? user.Roles[0] : 'Member');
            localStorage.setItem('email', user.Email);
            NotificationManager.success('Đăng nhập thành công', 'Thành công', 1000);
            model.current.style.display = 'none'
            
            if (user.Roles && (user.Roles.includes('ADMIN') || user.Roles.includes('Admin'))) {
                window.location.href = '/admin';
            } else {
                window.location.reload()
            }
        } else {
            NotificationManager.error("Sai tên đăng nhập hoặc mật khẩu", 'Lỗi', 1000);
        }
    }
    return (
        <>
            <div className={cx('modal')} ref={model} >
                <div onClick={handleModelClose} className={cx('overflow')} id="overflow"></div>
                <div className={cx('modal-login')}>
                    <div className={cx('login-text')}>Đăng nhập</div>
                    <div className={cx('login-input')}>
                        <label >Tên đăng nhập</label>
                        <input ref={userNameRef} required type="text" />
                    </div>
                    <div className={cx('login-input')}>
                        <label >Mật khẩu</label>
                        <input ref={passRef} required type="password" />
                    </div>
                    <div className={cx('login-button')}>
                        <button onClick={handleLogin}>Đăng nhập</button>
                    </div>
                </div>
            </div>
            <nav className="bg-white/80 dark:bg-surface-container/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-outline-variant/30 shadow-sm">
                <NotificationContainer />
                <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
                    <div className="flex items-center gap-8">
                        <Link className="text-headline-md font-display-lg font-bold text-primary dark:text-inverse-primary tracking-tight" to="/">
                            UNIBASE
                        </Link>
                        <div className="hidden md:flex gap-6">
                            <Link className="text-primary dark:text-inverse-primary font-bold hover:border-b-2 hover:border-primary pb-1 font-label-md text-label-md" to="/">Trang chủ</Link>
                            {localStorage.getItem('statusLogin') === 'login' &&
                                <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-label-md text-label-md" to="/projectsManager">Quản lý tài liệu</Link>
                            }
                            <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-label-md text-label-md" to="/projects">Danh sách tài liệu</Link>
                            <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-label-md text-label-md" to="/forum">Diễn đàn</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group">
                            <input className="bg-surface-container-low border border-outline-variant rounded-xl py-2 pl-4 pr-10 focus:outline-none focus:border-primary transition-colors w-64 text-body-md font-body-md" placeholder="Tìm kiếm tài liệu..." type="text" />
                            <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <button aria-label="Notifications" className="p-2 hover:bg-primary-container/10 dark:hover:bg-primary-container/20 rounded-lg text-primary dark:text-inverse-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>

                        {localStorage.getItem('statusLogin') === 'login' ? (
                            <div className="flex items-center gap-2">
                                <Link to={'/userInfo'} className="text-primary font-bold hover:underline">
                                    {localStorage.getItem('name')}
                                </Link>
                                <button onClick={handleLogOut} aria-label="Logout" className="p-2 hover:bg-error-container hover:text-error rounded-lg text-primary transition-colors">
                                    <span className="material-symbols-outlined">logout</span>
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleModel} aria-label="Account" className="p-2 hover:bg-primary-container/10 dark:hover:bg-primary-container/20 rounded-lg text-primary dark:text-inverse-primary transition-colors">
                                <span className="material-symbols-outlined">account_circle</span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;