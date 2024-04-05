import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    title,
    employmentType,
  } = similarJob

  return (
    <li className="similar-job-card">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company logo"
        />
        <div className="title-rating-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </div>
      <div className="location-container">
        <div className="item-container">
          <MdLocationOn className="icon" />
          <p className="icon-name">{location}</p>
        </div>
        <div className="item-container">
          <BsBriefcaseFill className="icon" />
          <p className="emp-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
