import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';

const Leaders = (props) => {
  const { filtered, leaders } = props;
  const lead = filtered.length > 0 ? filtered : leaders;

  return (
    <div className="clearfix">
      <h4>Leaders</h4>
      <hr />
      {lead.map((item) => (
        <Card
          key={item._id}
          item={item}
          handleClick={(e) => props.handleClickLeader(item, e)}
          disabled={item._id === props.selectLeader._id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaders: state.leaderState.leaders,
  selectLeader: state.leaderState.selectLeader,
  filtered: state.leaderState.filtered,
});

export default connect(
  mapStateToProps,
)(Leaders);
