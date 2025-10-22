import React, { useEffect, useState } from 'react'
import './style/AuthPanel.scss'
import AuthModal from "./AuthModal"
import { useNavigate } from 'react-router-dom'

const AuthPanel = ({
    isAuthed,
    user,
    me,
    onFetchMe,
    onLogout,
    onAuthed,
    requiredRole
}) => {

    const [open, setOpen] = useState(false)
    const hasRequiredRole = !requiredRole || (user && user.role === requiredRole)
    const navigate = useNavigate()
    const isAdminPage = requiredRole === 'admin'
    const title = isAdminPage ? '관리자 인증' : '로그인'



    useEffect(() => {
        if (!isAuthed || !user) return

        if (isAdminPage) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard', { replace: true })
            } else {
                navigate('/user/dashboard', { replace: true })
            }
        } else {
            navigate('/user/dashboard', { replace: true })
        }
    }, [isAuthed, isAdminPage, navigate])

    if (open) {
        return (
            <AuthModal
                open={open}
                onClose={() => setOpen(false)}
                onAuthed={onAuthed}
            />
        )
    }

    return (
        <section className='admin-wrap'>
            <div className="inner">
            <header className='admin-head'>
                <h1 className='title'>
                    {isAdminPage ? '🎧 로그인' : '🎵 플레이로그 로그인'}
                </h1>
                <p>
                    로그인 또는 회원가입 후 플레이로그 이용이 가능합니다.
                </p>
                {isAdminPage && (
                    <p className='desc'>
                        관리자 전용 페이지에서는 감상글 검수, 인기 감상글 추천, 저작권/불건전 내용 관리 기능을 제공합니다.
                    </p>
                )}
            </header>

            {!isAuthed ? (
                <div className="auth-row">
                    <button
                        onClick={() => setOpen(true)}
                        className="btn btn-primary">
                        로그인 / 회원가입
                    </button>
                </div>
            ) : (
                <div className="auth-row">
                    <span>안녕하세요 <b>{user?.displayName || user?.email}</b>님 🎶</span>
                    <span
                        className={`badge ${hasRequiredRole ? 'badge-ok' : 'badge-warn'} `}>
                        {hasRequiredRole ? 'admin' : `권한없음 : ${requiredRole} 필요`}
                    </span>

                    <div className="auth-actions">
                        {hasRequiredRole && (
                            <button className="btn" onClick={onFetchMe}>내 정보 보기</button>
                        )}
                        <button className="btn" onClick={onLogout}>로그아웃</button>
                    </div>
                </div>
            )}

            {!hasRequiredRole && (
                <div className="alert alert-warn">
                    현재 계정에는 관리자 권한이 없습니다. 관리자 승인이 필요합니다.
                </div>
            )}

            {me && (
                <pre className="code">
                    {JSON.stringify(me, null, 2)}
                </pre>
            )}
            </div>
        </section>
    )
}

export default AuthPanel
