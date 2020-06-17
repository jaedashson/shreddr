import React from 'react';
import { 
  withRouter,
} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/profile.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    const { currentUser } = props;

    this.state = {
      user: currentUser.id,
      weight: '',
      date: `${this.year}-${this.month}-${this.day}`,
      uploadFile: "upload-input"
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserProfile(this.props.match.params.userId);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  updateYear(field) {
    return e => {
      if (field === 'month') {
        this.month = e.target.value;
      } else if (field === 'year') {
        this.year = e.target.value;
      } else {
        this.day = e.target.value;
      }
      return this.setState({ date: `${this.year}-${this.month}-${this.day}` });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let weight = {
      user: this.state.user,
      weight: this.state.weight,
      date: this.state.date,
    };

    this.props.addNewWeight(weight);
  }

  // handleUploadClick() {

  //   $(".upload-input").click();
  // }


  render() {
    const { currentUser, user } = this.props;

    const data = [{ date: '6/5', weight: 178, amt: 2400 }, { date: '6/10', weight: 174, amt: 2500 }, { date: '6/15', weight: 169, amt: 2200 }];

    const renderLineChart = (
      <LineChart width={870} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} className="weight-chart">
        <Line type="monotone" dataKey="weight" stroke="#000000" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
    // <YAxis type="number" domain={['dataMin-5', 'dataMax+5']} tick={{ fill: 'white', fontSize: 12 }} />

    let addWeightPhotos;
    if (currentUser && currentUser.id === this.props.match.params.userId) {
      const years = ['Year']
      for (let i = 2020; i >= 2010; i--) {
        years.push(i);
      }

      const days = ['Day']
      for (let i = 1; i <= 31; i++) {
        days.push(i);
      }

      const months = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const weightYears = years.map(year => {
        return <option key={year} value={year}>{year}</option>
      })

      const weightDays = days.map(day => {
        return <option key={day} value={day}>{day}</option>;
      })

      const weightMonths = months.map((month, idx) => {
        return <option key={month} value={idx}>{month}</option>;
      })

      addWeightPhotos = (
        <div className="update-container">
          <div className="update">
            <div className="update-weight-container">
              <div className="update-weight">
                <span className="text">Update New Weight</span>
                <form onSubmit={this.handleSubmit}>
                  <label className="weight">Weight: 
                    <input type="text" onChange={this.update('weight')}/>
                  </label>

                  <div className="weight-date">
                    <span className="weight-text">Date: </span>
                    <div className="weight-r2">
                      <select
                        name={this.state.month}
                        className="weight-month"
                        onChange={this.updateYear("month")}
                        value={this.state.date.split('-')[1]}
                      >
                        {weightMonths}
                      </select>

                      <select
                        name={this.state.day}
                        className="weight-day"
                        onChange={this.updateYear("day")}
                        value={this.state.date.split('-')[2]}
                      >
                        {weightDays}
                      </select>

                      <select
                        name={this.state.year}
                        className="weight-year"
                        onChange={this.updateYear("year")}
                        value={this.state.date.split('-')[0]}
                      >
                        {weightYears}
                      </select>
                    </div>  
                  </div>

                  <button>Track Weight</button>
                </form>
              </div>
            </div>
            <div className="upload-photos-container">
              <div className="upload-photos">

                <span>Upload Progress Photos</span>
                <label className="upload-btn"
                  // onClick={this.handleUploadClick}
                  >
                  <FontAwesomeIcon className="upload-btn" 
                    icon="upload" />
                  <input className={this.state.uploadFile}
                    type="file"
                    id="file"
                    onChange={this.handleUploadPic}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <section className="profile">
        <div className="profile-nav">
          <div>
            <span>Member Profile</span>
          </div>
        </div>

        <section className="main">
          <div className="row-1-container">
            <div className="row-1">
              <div className="left">
                <div className="left-left">
                  <div className="pfp">
                    {/* user's pfp */}
                  </div>

                  <div>
                    <span className="name">{user ? user.fName : ''}</span>
                  </div>
                </div>

                <div className="left-right">
                  <div>
                    <span>Height: </span>
                    <span>Current Weight: </span>
                    <span>Goal Weight: </span>
                    <span>Pounds Lost: </span>
                  </div>
                </div>
              </div>

              <div className="right">
                <span>Progress Photos</span>
              </div>

              <div className="line"></div>
            </div>
          </div>

          {addWeightPhotos}
          
          <div className="progress-tracker-container">
            <div className="progress-tracker">
              <div className="banner">
                <span>Progress Tracker</span>
              </div>
              <div className="chart-container">
                {renderLineChart}
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default withRouter(Profile);