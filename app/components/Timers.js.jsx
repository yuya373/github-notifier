import React, {Component} from 'react';

export default class Timers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        interval: props.config.interval,
      },
      error: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.changeInterval(this.state.config.interval);
  }

  handleIntervalChange(e) {
    e.preventDefault();

    const interval = Number.parseInt(e.target.value, 10);

    if (Number.isNaN(interval) || !interval) {
      this.setState({error: "Interval must be Integer"});
    } else if (interval <= 0) {
      this.setState({error: "Interval must be greater than 0"});
    } else {
      this.setState({
        config: {
          ...this.state.config,
          interval: interval * 1000,
        }
      });
    }
  }

  renderRepositoryTimer(nameWithOwner) {
    const hasTimer = this.props.values.
          find((e) => nameWithOwner === `${e.owner}/${e.name}`);

    const btnClassName = hasTimer ? "btn btn-negative" :
          "btn btn-default";
    const btnLabel = hasTimer ? "Stop Timer" : "Start Timer";

    const handleClick = (e) => {
      e.preventDefault();
      if (hasTimer) {
        this.props.clickStopTimer(hasTimer);
      } else {
        const name = nameWithOwner.split("/")[1];
        const owner = nameWithOwner.split("/")[0];
        this.props.clickStartTimer({name, owner});
      }
    };

    return (
      <tr key={nameWithOwner} >
        <td>
          <span className="font-weight-bold">
            {nameWithOwner}
          </span>
        </td>
        <td>
          <div style={{float: "right"}} >
            <button
              onClick={handleClick}
              className={btnClassName}
              >
              {btnLabel}
            </button>
          </div>
        </td>
      </tr>
    );
  }

  render() {
    const handleSubmit = (e) => this.handleSubmit(e);
    const handleIntervalChange = (e) => this.handleIntervalChange(e);
    const error = this.state.error.length >= 1 ?
          (<div className="alert alert-danger">{this.props.error}</div>) : null;
    const renderRepositoryTimer = (e) => this.renderRepositoryTimer(e);
    return (
      <div>
        <h1>
          Timers
        </h1>

        <form onSubmit={handleSubmit} >
          {error}
          <div className="form-group">
            <label htmlFor="interval">Interval (seconds)</label>
            <input
              id="interval"
              type="number"
              min="60"
              className="form-control"
              placeholder="Interval"
              onChange={handleIntervalChange}
              value={(this.props.config.interval || 0) / 1000}
              />
          </div>
        </form>

        <h2>
          Repositories
        </h2>

        <table className="table-striped">
          <tbody>
            {this.props.repositories.map(renderRepositoryTimer)}
          </tbody>
        </table>
      </div>
    );
  }
}
