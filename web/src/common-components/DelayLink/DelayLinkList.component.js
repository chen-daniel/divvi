import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Wraps the React Router Link component and creates a delay after the link is clicked.
 */
class DelayLinkList extends React.Component {
  static defaultProps = {
    delay: 0,
    onDelayStart: () => {},
    onDelayEnd: () => {}
  };

  static contextTypes = Link.contextTypes;

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  /**
   * Called when the link is clicked
   *
   * @param {Event} e
   */
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { replace, to, delay, onDelayStart, onDelayEnd } = this.props;
    const { history, route } = this.context.router;
    const currLocation = route.location.pathname;

    if (currLocation === to && currLocation !== '/projects') {
      return;
    }
    if (currLocation.includes('/projects') && to.includes('/projects')) {
      history.replace(to);
      return;
    }
    onDelayStart(e, to);

    this.timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
      onDelayEnd(e, to);
    }, delay);
  };

  render() {
    const props = Object.assign({}, this.props);
    delete props.delay;
    delete props.onDelayStart;
    delete props.onDelayEnd;
    delete props.to;

    return <li onClick={this.handleClick}>{props.children}</li>;
  }
}

export default DelayLinkList;
