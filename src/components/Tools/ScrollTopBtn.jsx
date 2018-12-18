import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SvgIcon from './SvgIcon';

const appEl = document.getElementById('app-container');

class ScrollTopBtn extends Component {
  state = {
    active: false,
    offsetFooter: false
  }

  componentWillMount() {
    appEl.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    appEl.removeEventListener('scroll', this.handleScroll);
  }

  blurScrollBtn = e => ReactDOM.findDOMNode(this).blur()

  handleScroll = e => {
    this.setState({
      active: appEl.scrollTop > 300,
      offsetFooter: appEl.scrollTop + window.innerHeight >= appEl.scrollHeight
    });
  }

  getScrollClass = () => {
    const { active, offsetFooter } = this.state;
    let btnOffset = offsetFooter ? ' footer-offset' : '';
    let btnVisible = active ? ' active' : '';

    return `scroll-top-btn btn${btnVisible}${btnOffset}`;
  }

  scrollToTop = e => appEl.scroll({ behavior: 'smooth', left: 0, top: 0 })

  render() {
    return (
      <div className={this.getScrollClass()}
        onMouseDown={this.scrollToTop}
        onMouseUp={this.blurScrollBtn}
        role="Button"
        tabIndex="0"
        title="Jump to Top"
      >
        <div className="icon-arrow">
          <SvgIcon name="arrow" viewBox="0 0 60 60" />
        </div>
      </div>
    );
  }
}

export default ScrollTopBtn;
