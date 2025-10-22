import React from 'react'
import { Link } from 'react-router-dom'
import "./style/Landing.scss"

const Landing = () => {
    return (
        <section className="landing">
            <div className="container">
                <div className="landing-hero">
                    <h1>PlayLog</h1>
                    <p className="landing-sub">오늘 들은 음악, 한 줄 감상으로 기록하세요.</p>
                    <Link to="/admin/login" className="btn btn-primary">시작하기</Link>
                </div>

                <ul className="landing-features">
                    <li>
                        <h3>빠른 기록</h3>
                        <p>곡명, 아티스트, 감상 한 줄 메모로 즉시 저장.</p>
                    </li>
                    <li>
                        <h3>검색</h3>
                        <p>곡명 또는 아티스트 검색으로 바로 찾기.</p>
                    </li>
                    <li>
                        <h3>간단 공유</h3>
                        <p>공유 링크로 나만의 음악 컬렉션을 보여주세요.</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Landing
