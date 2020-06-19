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

    
    const { currentUser, user, userBodyweights } = props;
    
    if (user && user.bodyweights) {
      this.state = {
        bodyweights: userBodyweights,
        user: currentUser.id,
        weight: '',
        date: `${this.year}-${this.month}-${this.day}`,
        uploadFile: "upload-input",
        progressPicDay: date.getDate(),
        progressPicMonth: date.getMonth() + 1,
        progressPicYear: date.getFullYear(),
        progressPicFile: null
      } 
    } else {
      this.state = {
        bodyweights: '',
        user: currentUser.id,
        weight: '',
        date: `${this.year}-${this.month}-${this.day}`,
        uploadFile: "upload-input",
        progressPicDay: date.getDate(),
        progressPicMonth: date.getMonth() + 1,
        progressPicYear: date.getFullYear(),
        progressPicFile: null
      } 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitProgressPic = this.handleSubmitProgressPic.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserProfile(this.props.match.params.userId)
      .then(action => this.props.fetchUserWeights(action.user.data._id));
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

  updateProgressPicDate(field) {

  }

  handleSubmit(e) {
    e.preventDefault();
    let weight = {
      user: this.state.user,
      weight: this.state.weight,
      date: this.state.date,
    };

    this.props.addNewWeight(weight)
      .then(() => this.props.fetchUserWeights(this.props.match.params.userId));
  }

  handleSubmitProgressPic(e) {
    e.preventDefault();
  }

  handleSelectFile(e) {
    e.preventDefault();
    this.setState({
      progressPicFile: e.currentTarget.files[0]
    })
  }

  render() {
    const { currentUser, user, userBodyweights } = this.props;

    if (!user) {
      return null;
    }

    let data = [], weights = [], minWeight, maxWeight, renderLineChart, ticks, yaxis;
    if (userBodyweights && userBodyweights.length > 0) {
      let userWeights = userBodyweights.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
      for (let i = 0; i < userWeights.length; i++) {
        let w = userWeights[i];
        let date = new Date(w.date);
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let y = date.getFullYear();
        data.push({date: `${m}/${d}/${y}`, weight: w.weight});
        weights.push(w.weight);
      }

      minWeight = Math.min(...weights) - 10;
      maxWeight = Math.max(...weights) + 10;
      let yDomain = [];
      const freq = (maxWeight - minWeight) / 8;
      let startDomain = minWeight - freq;
      
      for(let i = 0; i < 10; i++) {
        yDomain.push(Math.floor(startDomain));
        startDomain += freq;
      }

      renderLineChart = (
        <LineChart width={870} 
          height={300} 
          data={data} 
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }} 
          className="weight-chart">
          <Line type="monotone" dataKey="weight" stroke="#000000" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis type="number" 
            domain={[minWeight - 10, maxWeight + 10]} 
            ticks={yDomain} 
            />
          <Tooltip />
        </LineChart>
      );
    } else if (user.bodyweights.length === 0) {
      renderLineChart = (
        <div className="nchart-error-wrapper">
          <span className="nchart-error">wuh-woh! wooks wike you don't have any weights. pwease add a new weight to twack your pwogwess!</span>
        </div>
      )
    }


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

                  <div className="weight-wrapper">
                    <label className="weight">Weight: </label>
                    <input type="text" onChange={this.update('weight')} />
                  </div>

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

                  <button className="track-weight-btn">Track Weight</button>
                </form>
              </div>
            </div>
            <div className="upload-photos-container">
              <div className="upload-photos">

                <span>Upload Progress Photos</span>
                <form onSubmit={this.handleSubmitProgressPic}>
                  <label className="upload-btn"
                    // onClick={this.handleUploadClick}
                    >
                    <FontAwesomeIcon className="upload-btn" 
                      icon="upload" />
                    <input className={this.state.uploadFile}
                      type="file"
                      id="file"
                      onChange={this.handleSelectFile}
                      accept="image/*"
                    />
                  </label>

                  <div className="weight-date">
                    <span className="weight-text">Date: </span>
                    <div className="weight-r2">
                      <select
                        className="weight-month"
                        onChange={this.updateYear("month")}
                        value={this.state.date.split('-')[1]}
                      >
                        {weightMonths}
                      </select>

                      <select
                        name={this.state.progressPicDay}
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

                  <button></button>
                </form>
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