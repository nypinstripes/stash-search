import { connect } from 'react-redux';
import { array, func, number, object, string } from 'prop-types';
import { setListPage } from '../../actions/actionCreators';
import { withRouter } from 'react-router-dom';
import breakpoints from '../../../shared/data/breakpoints.json';
import Empty from '../Tools/Empty';
import ListItem from './ListItem';
import ListInfo from './ListInfo';
import React, { Component } from 'react';
import SvgSymbol from '../Tools/SvgSymbol';

const appEl = document.getElementById('app-container');

class List extends Component {
  static propTypes = {
    currentTerm: string,
    emptyType: object,
    listItems: array,
    listPage: number,
    name: string,
    setListPage: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    gridW: 0,
    itemsPerPage: 30,
    maxGridW: 'auto',
    pagingVisible: 'concealed'
  }

  componentDidMount() {
    this.updateGridWidth();
  }

  componentWillUpdate(nextProps, nextState) {
    const { winW: nextWinW } = nextProps;
    const { winW } = this.props;

    if (winW !== nextWinW) this.updateGridWidth();
  }

  concealPagingControl = () => this.setState({ pagingVisible: 'concealed' })
  getEmptyList = () => <Empty emptyType={this.props.emptyType} />

  getMorePagesToShow = pagingData => {
    const { currentPage, totalPages } = pagingData;

    if (currentPage >= totalPages - 1) return '';

    return (
      <div className="page-number-extension">
        <div className="page-number-extended">
          <span>...</span>
        </div>
        <div className="page-number-extended">
          <span>{totalPages}</span>
        </div>
      </div>
    );
  }

  getPageNumber = params => {
    const { page, data: { currentPage }} = params;

    return (
      <div className="page-number"
        data-number={page}
        key={page}
        onClick={e => this.goToPage(e, { currentPage, page })}
        role="Button"
        tabIndex="0"
      >
        <span>{page}</span>
      </div>
    );
  }

  getPagingBtn = (btnType, pagingData) => {
    const { currentPage, isLastPage, totalPages } = pagingData;
    let btnNumber;

    switch(btnType) {
      case 'first': btnNumber = 1; break;
      case 'last': btnNumber = totalPages; break;
      case 'next': btnNumber = currentPage + 1; break;
      case 'prev': btnNumber = currentPage - 1; break;
      default: btnNumber = 1;
    }

    return (
      <div className="page-number-btn"
        data-btn={btnType}
        data-number={btnNumber}
        onClick={e => this.goToPage(e, { currentPage, page: btnNumber })}
        role="Button"
        title={`${btnType} page`}
        tabIndex="0"
      >
        { this.getPagingBtnIcon() }
        { btnType === 'first' || btnType === 'last' ?
          this.getPagingBtnIcon() : ''
        }
      </div>
    );
  }

  getPagingBtnIcon = () => (
    <div className="page-number-btn-icon">
      <SvgSymbol symbolId="#icon-caret" />
    </div>
  )

  getPagingControl = (currentPage, pageNumbers) => {
    const { pagingVisible } = this.state;
    let firstPage, secondPage, thirdPage;
    let totalPages = pageNumbers.length;
    let isLastPage = currentPage === totalPages;
    let pagingData = { currentPage, isLastPage, totalPages };

    if (totalPages === 1) {
      return '';
    } else if (totalPages === 2) {
      firstPage = 1;
      secondPage = 2;
      thirdPage = null;
    } else if (currentPage === 1 && totalPages > 2) {
      firstPage = 1;
      secondPage = 2;
      thirdPage = 3;
    } else if (isLastPage && totalPages > 2) {
      firstPage = totalPages - 2;
      secondPage = totalPages - 1;
      thirdPage = totalPages;
    } else {
      firstPage = currentPage - 1;
      secondPage = currentPage;
      thirdPage = currentPage + 1;
    }

    return (
      <div className={`page-numbers ${pagingVisible}`}
        data-page={currentPage}
        data-last={isLastPage ? 'true' : 'false'}
      >
        { totalPages > 3 ? this.getPagingBtn('first', pagingData) : '' }
        { this.getPagingBtn('prev', pagingData) }
        <div className="page-number-container">
          { this.getPageNumber({ page: firstPage, data: pagingData }) }
          { this.getPageNumber({ page: secondPage, data: pagingData }) }
          {
            thirdPage ?
            this.getPageNumber({ page: thirdPage, data: pagingData }) : ''
          }
          { totalPages > 3 ? this.getMorePagesToShow(pagingData) : '' }
        </div>
        { this.getPagingBtn('next', pagingData) }
        { totalPages > 3 ? this.getPagingBtn('last', pagingData) : '' }
      </div>
    );
  }

  goToPage = (e, params) => {
    const { setListPage } = this.props;
    const { currentPage, page } = params;

    if (currentPage !== page) {
      this.concealPagingControl();
      setListPage(parseInt(e.currentTarget.getAttribute('data-number')));
    }

    this.scrollToTop();
  }

  revealPagingControl = () => this.setState({ pagingVisible: 'revealed' })
  scrollToTop = e => appEl.scroll({ behavior: 'smooth', left: 0, top: 0 })

  updateGridWidth = () => {
    const { winW } = this.props;
    const {
      small: minGrid,
      medium: mediumGrid,
      large: largeGrid,
      xLarge: xLargeGrid
    } = breakpoints.viewport;

    let minItemCount;
    let spacing = 0;
    let itemW = 288;

    if (winW < mediumGrid) {
      return this.setState({
        gridW: '100%',
        maxGridW: 'auto'
      });
    }

    spacing = winW < largeGrid ? 16 : 24;
    itemW += spacing;
    minItemCount = Math.floor(winW / itemW);

    this.setState({ gridW: `${minItemCount * itemW}px` });
  }

  render() {
    const {
      currentTerm,
      listItems,
      listPage,
      name,
      toggleOverlay,
      winW
    } = this.props;

    const { gridW, itemsPerPage, maxGridW } = this.state;
    let totalItems = listItems.length;

    if (totalItems === 0) return this.getEmptyList();

    let lastItem = listPage * itemsPerPage;
    let firstItem = lastItem - itemsPerPage;
    let currentItems = listItems.slice(firstItem, lastItem);
    let pageNumbers = [];
    let wellWidth = {
      maxWidth: maxGridW,
      width: gridW
    };

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <section aria-live="polite" className="list">
        <ListInfo count={totalItems}
          currentTerm={currentTerm}
          name={name}
        />
        <div className="list-grid" role="List" style={wellWidth}>
          {currentItems.map((item, i) => {
            return <ListItem item={item}
              itemIndex={i}
              key={item.id}
              pageLength={currentItems.length}
              revealPagingControl={this.revealPagingControl}
              toggleOverlay={toggleOverlay}
              type={name}
              winW={winW}
            />;
          })}
        </div>
        {
          totalItems > itemsPerPage ?
          this.getPagingControl(listPage, pageNumbers)
          :
          null
        }
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentTerm: state.currentTerm ? state.currentTerm : '',
  listItems: state.listItems ? state.listItems : [],
  listPage: state.listPage ? state.listPage : 1
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setListPage(params) { dispatch(setListPage(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
