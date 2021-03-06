import React from 'react';
import './ReportDetails.css';
import moment from 'moment';
import 'moment-duration-format';

class ReportDetails extends React.Component {
  constructor (props) {
    super(props);
    console.log(this.props);
    this.state = {
      viewReports: []
    }
  }

  getDuration = (data) => {
    let starthour = moment([data.starthour], 'hh:mm');
    let finishhour = moment([data.finishhour], 'hh:mm');
    let hours = moment.duration(finishhour.diff(starthour, 'minutes'),
    'minutes').format('h [ש\'] m [ד\']', {
        trim: "large"
    });
    return hours;
  }

  showReports = () => {
    const reports = this.props.reports.reports;
    console.log(reports);
    const allReports = reports.map((report, index) => {
      let hours = this.getDuration(report);

      let projectId = report.projectid;
      let courseId = report.courseid;
      const reportPerimeter = this.props.reports.reportingPerimeter[projectId];
      if( ! reportPerimeter ) {
        return null;
      }
      let courseName;
      for (let i=0; i < reportPerimeter.courses.length; i++) {
        if(reportPerimeter.courses[i].courseid === courseId) {
          courseName = reportPerimeter.courses[i].courseName
        }
        if(!courseId) {
          courseName = 'כללי';
        }
      }
      // console.log(courseName);
      let actionId = report.actionid;
      let subject;
      for (let i=0; i<reportPerimeter.subjects.length; i++) {
        if(reportPerimeter.subjects[i].reportsubjectid === actionId) {
          subject = reportPerimeter.subjects[i].subject
        }
      }
      let reportStyle;
      if (report.approval === '1') {
        reportStyle = 'approval';
      }
      if (report.approval === '0') {
        reportStyle = 'pending';
      }
      if (report.approval === '-1') {
        reportStyle = 'reject';
      }
      
      return (
        <div className={`report-details ${reportStyle}`}>
            <div className="report-wrap">
              <div className="details-row">
                <input className="report-checkbox" type="checkbox" />
                <span className="details-text">תאריך: {report.date}</span>
                <span className="details-text">סה''כ שעות: {hours}</span>
              </div>
              <div className="report-row">
           <div className="report-column">
            <span className="report-head">פרויקט</span>
            <span className="report-text">{reportPerimeter.projectName}</span>
           </div>
           <div className="report-column">
             <span className="report-head">מס/שם קורס</span>
             <span className="report-text">{courseName}</span>
           </div>
           <div className="report-column">
             <span className="report-head">נושא פעילות</span>
             <span className="report-text">{subject}</span>
           </div>
         </div>
            </div>
          </div>
      )
    })
    this.setState({
      viewReports: allReports
    })
  }

  render () {
    return (
      <div>
        {this.state.viewReports}
      </div>
    )
  }
}
export default ReportDetails;