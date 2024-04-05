/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    salaryRange: '',
    checkboxInputs: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, searchInput, salaryRange} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          className="search-input"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onChangeCheckBox = event => {
    const {checkboxInputs} = this.state
    const inputInList = checkboxInputs.includes(event.target.id)
    if (!inputInList) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        each => each !== event.target.id,
      )

      this.setState({checkboxInputs: filteredData}, this.getJobs)
    }
  }

  renderEmploymentTypes = () => (
    <div className="filter-container">
      <ul className="list-container">
        {employmentTypesList.map(eachItem => (
          <li className="list-item" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              onChange={this.onChangeCheckBox}
              id={eachItem.employmentTypeId}
            />
            <label className="filter_label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobs)
  }

  renderSalaryRanges = () => {
    const {salaryRange} = this.state
    return (
      <div className="filter-container">
        <ul className="list-container">
          {salaryRangesList.map(item => (
            <li className="list-item" key={item.salaryRangeId}>
              <input
                type="radio"
                name="option"
                id={item.salaryRangeId}
                onChange={this.onChangeSalaryRange}
                value={salaryRange}
              />
              <label className="filter_label" htmlFor={item.salaryRangeId}>
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const jobs = jobsList.length > 0
    return jobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard jobData={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-head">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryBtn = () => {
    this.getJobs()
  }

  renderJobsFailureView = () => (
    <div className="failureView_container">
      <img
        className="failure_image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureView_heading">Oops! Something Went Wrong</h1>
      <p className="failureView_description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {checkboxInputs} = this.state
    console.log(checkboxInputs)
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="filters-container">
            <div className="mobile-view-search-container">
              {this.renderSearch()}
            </div>
            <Profile />
            <hr className="line" />
            <h1 className="filter-head">Type of Employment</h1>
            {this.renderEmploymentTypes()}
            <hr className="line" />
            <h1 className="filter-head">Salary Range</h1>
            {this.renderSalaryRanges()}
          </div>
          <div className="jobs-container">
            <div className="desktop-view-search-container">
              {this.renderSearch()}
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
