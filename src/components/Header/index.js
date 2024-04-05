/* eslint-disable jsx-a11y/control-has-associated-label */
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="list-sm-container">
          <Link to="/">
            <li className="list-item">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="list-item">
              <BsFillBriefcaseFill className="icon" />
            </li>
          </Link>
          <Link to="/login" className="nav-link">
            <button type="button" className="sm-btn" onClick={onClickLogout}>
              <FiLogOut className="icon" />
            </button>
          </Link>
        </ul>
        <div className="nav-items-lg-container">
          <ul className="list-home-jobs">
            <Link to="/" className="lg-nav-link">
              <li className="lg-list-item">Home</li>
            </Link>
            <Link to="/jobs" className="lg-nav-link">
              <li className="lg-list-item">Jobs</li>
            </Link>
          </ul>
        </div>

        <button type="button" onClick={onClickLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
