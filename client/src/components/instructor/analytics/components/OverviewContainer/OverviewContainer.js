import React, { Component } from 'react';
import {connect} from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {initOverview} from '../../../../../actions/analytics'

class AnalyticsContainer extends Component {

  componentWillMount(){
    let pathnames = this.props.location.pathname.split("/");
    this.props.initOverview(pathnames[pathnames.length-2], pathnames[pathnames.length-1])
  }

  render(){
    return (
      <div className={'instructor-analytics-overview-container'}>
        { this.props.instructor.analytics ? this.props.instructor.analytics.map(anAnalytic =>(
          <div className={'analytics-chart'}>
            <h4>{anAnalytic.type}</h4>
            <LineChart width={500} height={300} data={anAnalytic.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
          </div>
        )) : null
        }
      </div>
    )


  }


}


const mapStateToProps = state => ({
  auth: state.auth,
  instructor: state.instructor
});

const mapDispatchToProps = ({
  initOverview
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);