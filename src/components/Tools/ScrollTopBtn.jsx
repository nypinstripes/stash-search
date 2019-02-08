import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SvgSymbol from './SvgSymbol';

class ScrollTopBtn extends Component {
  state = {
    active: false,
    offsetFooter: false,
    scrollAnchor: null
  }

  componentWillMount() {
    this.setScrollAnchor();
  }

  componentDidMount() {
    this.state.scrollAnchor.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.state.scrollAnchor.removeEventListener('scroll', this.handleScroll);
  }

  blurScrollBtn = e => ReactDOM.findDOMNode(this).blur()

  handleScroll = e => {
    const { scrollAnchor: { scrollTop, scrollHeight }} = this.state;

    this.setState({
      active: scrollTop > 300,
      offsetFooter: scrollTop + window.innerHeight >= scrollHeight
    });
  }

  getIconArrow = part => (
    <div className={`icon-arrow-${part}`} role="presentation">
      <SvgSymbol symbolId={`#icon-arrow-${part}`} />
    </div>
  )

  getScrollClass = () => {
    const { active, offsetFooter } = this.state;
    let btnOffset = offsetFooter ? ' footer-offset' : '';
    let btnVisible = active ? ' active' : '';

    return `scroll-top-btn btn${btnVisible}${btnOffset}`;
  }

  scrollToTop = e => {
    this.state.scrollAnchor.scroll({
      behavior: 'smooth',
      left: 0,
      top: 0
    });
  }

  setScrollAnchor = () => {
    this.setState({ scrollAnchor: document.getElementById('app-container') });
  }

  render() {
    return (
      <div aria-controls="app-container"
        className={this.getScrollClass()}
        onMouseDown={this.scrollToTop}
        onMouseUp={this.blurScrollBtn}
        role="Button"
        tabIndex="0"
        title="Jump to Top"
      >
      { this.getIconArrow('left') }
      { this.getIconArrow('center') }
      { this.getIconArrow('right') }
      </div>
    );
  }
}

export default ScrollTopBtn;
