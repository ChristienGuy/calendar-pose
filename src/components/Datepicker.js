import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import Calendar from "./Calendar";

const Wrapper = styled.div`
  width: 580px;
  height: 300px;
  padding: 24px;

  display: flex;
  flex-direction: column;

  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`;

const CalendarWrapper = styled.div`
  display: flex;
  height: 100%;

  overflow: hidden;
`;

const InnerWrapper = posed(styled.div`
  display: flex;
  height: 100%;
  /* background: red; */
  transform: translateX(-314px);
`)({
  start: {
    x: -314,
    transition: {
      duration: 0
    }
  },
  nextMonth: {
    x: -616,
    transition: {
      ease: "easeInOut",
      duration: 300
    }
  },
  prevMonth: {
    x: -12,
    transition: {
      ease: "easeInOut",
      duration: 300
    }
  },
  initialPose: "start"
});

class Datepicker extends React.Component {
  state = {
    calendarPose: "start",
    calendars: [0, 1, 2, 3],
    transitionDirection: null
  };

  ref = null;

  onBack = () => {
    this.setState({
      calendarPose: "prevMonth",
      transitionDirection: "back"
    });
  };

  onForward = () => {
    this.setState({
      calendarPose: "nextMonth",
      transitionDirection: "forward"
    });
  };

  onAnimationComplete = () => {
    const { transitionDirection } = this.state;

    if (transitionDirection === "forward") {
      this.setState(
        state => ({
          calendars: state.calendars.map(calendar => calendar + 1),
          transitionDirection: null
        }),
        () => {
          this.ref.style.transform = `translateX(-314px)`;
          this.setState({
            calendarPose: "start"
          });
        }
      );
    } else if (transitionDirection === "back") {
      this.setState(
        state => ({
          calendars: state.calendars.map(calendar => calendar - 1),
          transitionDirection: null
        }),
        () => {
          this.ref.style.transform = `translateX(-314px)`;
          this.setState({
            calendarPose: "start"
          });
        }
      );
    }
  };

  onValueChange = x => {
    this.x = x;
  };

  setRef = el => {
    this.ref = el;
  };

  renderCalendars = () => {
    const { calendars } = this.state;
    return calendars.map(calendar => (
      <Calendar key={calendar} number={calendar} />
    ));
  };

  render() {
    const { calendarPose } = this.state;
    return (
      <Wrapper>
        <CalendarWrapper>
          <InnerWrapper
            innerRef={this.setRef}
            pose={calendarPose}
            onPoseComplete={this.onAnimationComplete}
            onValueChange={{ x: this.onValueChange }}
          >
            {this.renderCalendars()}
          </InnerWrapper>
        </CalendarWrapper>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={this.onBack}>Back</button>
          <button onClick={this.onForward}>Forward</button>
        </div>
      </Wrapper>
    );
  }
}

export default Datepicker;
