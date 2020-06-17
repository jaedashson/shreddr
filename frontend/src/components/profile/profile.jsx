import React from 'react';
import { 
  withRouter,
  Link 
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/profile.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
    }
  }

  render() {
    const { logout, addNewWeight, currentUser } = this.props;

    const data = [{ date: '6/5', weight: 178, pv: 2400, amt: 2400 }, { date: '6/10', weight: 174, pv: 2500, amt: 2500 }, { date: '6/15', weight: 169, pv: 2200, amt: 2200 }];

    const renderLineChart = (
      <LineChart width={870} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} className="weight-chart">
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
    // <YAxis type="number" domain={['dataMin-5', 'dataMax+5']} tick={{ fill: 'white', fontSize: 12 }} />

    let addWeightPhotos;
    if (currentUser.id && currentUser.id === this.props.match.params.userId) {
      addWeightPhotos = (
        <div className="update-container">
          <div className="update">
            <div className="update-weight">
              <span>Update New Weight</span>
            </div>
            <div className="upload-photos">
              <span>Upload Progress Photos</span>
            </div>
          </div>
        </div>
      )
    }

    return(
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
                  <span className="name">Tiffany</span>
                    {/* change to currentUser's fname */}
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

          {/* <div className="update-container">
            <div className="update">
              <div className="update-weight">
                <span>Update New Weight</span>
              </div>              
              <div className="upload-photos">
                <span>Upload Progress Photos</span>
              </div>              
            </div>
          </div> */}

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